"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import { Plus, Edit, Trash2, Search, FileText, Upload, FileStack, Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Separator } from "@/src/components/ui/separator"
import { toast } from "@/src/hooks/use-toast"

export function ResourcesManager() {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Joint Health and Mobility Guide",
      category: "Orthopaedics",
      description: "Comprehensive guide to maintaining healthy joints and mobility",
      status: "Published",
      lastUpdated: "2024-01-15",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Pre-Surgery Preparation",
      category: "Surgery Prep",
      description: "Essential steps to prepare for orthopaedic surgery procedures",
      status: "Draft",
      lastUpdated: "2024-01-14",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Physical Therapy Exercises",
      category: "Rehabilitation",
      description: "Guided exercises for post-surgery rehabilitation and recovery",
      status: "Published",
      lastUpdated: "2024-01-13",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Knee Replacement Recovery Timeline",
      category: "Surgery Prep",
      description: "Week-by-week recovery expectations after knee replacement surgery",
      status: "Draft",
      lastUpdated: "2024-01-10",
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  const [categories, setCategories] = useState([
    "Orthopaedics",
    "Surgery Prep",
    "Rehabilitation",
    "General Health",
    "Sports Medicine",
    "Trauma Care",
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isManageCategoriesDialogOpen, setIsManageCategoriesDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [newCategoryName, setNewCategoryName] = useState("")

  const handleAddResource = () => {
    setEditingResource(null)
    setIsDialogOpen(true)
  }

  const handleEditResource = (resource: any) => {
    setEditingResource(resource)
    setIsDialogOpen(true)
  }

  const handleAddCategory = () => {
    setIsCategoryDialogOpen(true)
  }

  const handleManageCategories = () => {
    setIsManageCategoriesDialogOpen(true)
  }

  const handleSaveCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()])
      setNewCategoryName("")
      setIsCategoryDialogOpen(false)
      toast({
        title: "Category Added",
        description: `"${newCategoryName.trim()}" has been added to categories.`,
      })
    }
  }

  const handleDeleteCategory = (categoryToDelete: string) => {
    // Check if the category is in use
    const isInUse = resources.some((resource) => resource.category === categoryToDelete)

    if (isInUse) {
      toast({
        title: "Cannot Delete Category",
        description: `"${categoryToDelete}" is in use by one or more resources and cannot be deleted.`,
        variant: "destructive",
      })
      return
    }

    // If not in use, delete it
    const updatedCategories = categories.filter((category) => category !== categoryToDelete)
    setCategories(updatedCategories)
    toast({
      title: "Category Deleted",
      description: `"${categoryToDelete}" has been removed from categories.`,
    })
  }

  const handlePublishResource = (resource: any) => {
    // If we're editing an existing resource
    if (resource.id) {
      setResources(
        resources.map((r) => (r.id === resource.id ? { ...r, status: "Published", lastUpdated: getCurrentDate() } : r)),
      )
    } else {
      // For a new resource
      const newResource = {
        ...resource,
        id: resources.length + 1,
        status: "Published",
        lastUpdated: getCurrentDate(),
      }
      setResources([...resources, newResource])
    }
    setIsDialogOpen(false)
  }

  const handleSaveAsDraft = (resource: any) => {
    // If we're editing an existing resource
    if (resource.id) {
      setResources(
        resources.map((r) => (r.id === resource.id ? { ...r, status: "Draft", lastUpdated: getCurrentDate() } : r)),
      )
    } else {
      // For a new resource
      const newResource = {
        ...resource,
        id: resources.length + 1,
        status: "Draft",
        lastUpdated: getCurrentDate(),
      }
      setResources([...resources, newResource])
    }
    setIsDialogOpen(false)
  }

  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const filteredResources = activeTab === "drafts" ? resources.filter((r) => r.status === "Draft") : resources

  const draftCount = resources.filter((r) => r.status === "Draft").length

  // Count resources per category
  const categoryUsage = categories.map((category) => {
    const count = resources.filter((resource) => resource.category === category).length
    return { name: category, count }
  })

  return (
    <div className="bg-white text-black space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Patient Resources</h2>
          <p className="text-muted-foreground">Manage educational materials and resources for your patients.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setActiveTab("drafts")}>
            <FileStack className="mr-2 h-4 w-4" />
            Drafts {draftCount > 0 && <Badge className="ml-1">{draftCount}</Badge>}
          </Button>
          <Button onClick={handleAddResource}>
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-8" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                {category}
              </SelectItem>
            ))}
            <Separator className="my-1" />
            <div className="p-1 flex flex-col space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-primary hover:text-primary"
                onClick={handleAddCategory}
              >
                <Plus className="mr-2 h-3 w-3" />
                Add Category
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={handleManageCategories}
              >
                <Settings className="mr-2 h-3 w-3" />
                Manage Categories
              </Button>
            </div>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>A list of all patient resources and educational materials.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-sm text-muted-foreground">{resource.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{resource.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={resource.status === "Published" ? "default" : "secondary"}>
                          {resource.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{resource.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditResource(resource)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="drafts" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Draft Resources</CardTitle>
              <CardDescription>Resources that are not yet published and still in draft state.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-sm text-muted-foreground">{resource.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{resource.category}</Badge>
                      </TableCell>
                      <TableCell>{resource.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditResource(resource)}>
                            Edit
                          </Button>
                          <Button size="sm" onClick={() => handlePublishResource(resource)}>
                            Publish
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resource Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingResource ? "Edit Resource" : "Add New Resource"}</DialogTitle>
            <DialogDescription>
              {editingResource
                ? "Update the resource information below."
                : "Create a new patient resource. Fill in the details below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue={editingResource?.title || ""} placeholder="Enter resource title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={editingResource?.category || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                  <Separator className="my-1" />
                  <div className="p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-primary hover:text-primary"
                      onClick={handleAddCategory}
                    >
                      <Plus className="mr-2 h-3 w-3" />
                      Add Category
                    </Button>
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resource-image">Resource Image</Label>
              <div className="space-y-2">
                <Input
                  id="resource-image"
                  type="url"
                  defaultValue={editingResource?.image || ""}
                  placeholder="Enter image URL or upload an image"
                />
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
                {editingResource?.image && (
                  <div className="mt-2">
                    <img
                      src={editingResource.image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue={editingResource?.description || ""}
                placeholder="Enter resource description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Enter the main content of the resource" className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => handleSaveAsDraft(editingResource || {})}>
                Save as Draft
              </Button>
              <Button onClick={() => handlePublishResource(editingResource || {})}>Publish</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Modal */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new category for organizing your patient resources.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Categories Modal */}
      <Dialog open={isManageCategoriesDialogOpen} onOpenChange={setIsManageCategoriesDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
            <DialogDescription>
              View, add, or remove resource categories. Categories that are in use cannot be deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryUsage.map((category) => (
                  <TableRow key={category.name}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.count}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteCategory(category.name)}
                        disabled={category.count > 0}
                        title={category.count > 0 ? "Cannot delete category in use" : "Delete category"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsManageCategoriesDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={handleAddCategory}>Add New Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
