"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import { Plus, Edit, Trash2, Search, Eye, Calendar, Upload, Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Separator } from "@/src/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { toast } from "@/src/hooks/use-toast"

export function BlogsManager() {
  const [blogs, setBlogPosts] = useState([
    {
      id: 1,
      title: "Understanding Knee Replacement Surgery",
      author: "Dr. Teshome Tena",
      category: "Orthopaedics",
      status: "Published",
      publishDate: "2024-01-15",
      views: 1250,
      image: "/placeholder.svg?height=200&width=300",
      excerpt: "A comprehensive guide to knee replacement procedures, recovery, and what to expect.",
    },
    {
      id: 2,
      title: "Managing Sports Injuries",
      author: "Dr. Teshome Tena",
      category: "Sports Medicine",
      status: "Draft",
      publishDate: "2024-01-20",
      views: 0,
      image: "/placeholder.svg?height=200&width=300",
      excerpt: "Prevention and treatment strategies for common sports-related injuries and trauma.",
    },
    {
      id: 3,
      title: "Post-Surgery Recovery Tips",
      author: "Dr. Teshome Tena",
      category: "Recovery",
      status: "Published",
      publishDate: "2024-01-10",
      views: 890,
      image: "/placeholder.svg?height=200&width=300",
      excerpt: "Essential guidelines for optimal recovery after orthopaedic surgery procedures.",
    },
  ])

  const [categories, setCategories] = useState([
    "Orthopaedics",
    "Sports Medicine",
    "Trauma",
    "General Health",
    "Recovery",
    "Patient Education",
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isManageCategoriesDialogOpen, setIsManageCategoriesDialogOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<any>(null)
  const [newCategoryName, setNewCategoryName] = useState("")

  const handleAddBlog = () => {
    setEditingBlog(null)
    setIsDialogOpen(true)
  }

  const handleEditBlog = (blog: any) => {
    setEditingBlog(blog)
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
    const isInUse = blogs.some((blog) => blog.category === categoryToDelete)

    if (isInUse) {
      toast({
        title: "Cannot Delete Category",
        description: `"${categoryToDelete}" is in use by one or more blog posts and cannot be deleted.`,
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

  // Count blogs per category
  const categoryUsage = categories.map((category) => {
    const count = blogs.filter((blog) => blog.category === category).length
    return { name: category, count }
  })

  return (
    <div className="bg-white text-black space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground">Create and manage blog posts for your medical practice website.</p>
        </div>
        <Button onClick={handleAddBlog}>
          <Plus className="mr-2 h-4 w-4" />
          New Blog Post
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search blog posts..." className="pl-8" />
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
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog.id} className="flex flex-col overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="object-cover w-full h-full" />
              <div className="absolute top-2 left-2">
                <Badge variant={blog.status === "Published" ? "default" : "secondary"}>{blog.status}</Badge>
              </div>
              <div className="absolute top-2 right-2 flex items-center space-x-1 text-sm text-white bg-black/50 px-2 py-1 rounded">
                <Eye className="h-3 w-3" />
                <span>{blog.views}</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
              <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{blog.publishDate}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  By {blog.author} • {blog.category}
                </div>
              </div>
            </CardContent>
            <div className="flex items-center justify-between p-6 pt-0">
              <Button variant="outline" size="sm" onClick={() => handleEditBlog(blog)}>
                <Edit className="mr-2 h-3 w-3" />
                Edit
              </Button>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            <DialogDescription>
              {editingBlog
                ? "Update your blog post details below."
                : "Create a new blog post for your website. Fill in the details below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="blog-title">Title</Label>
              <Input id="blog-title" defaultValue={editingBlog?.title || ""} placeholder="Enter blog post title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="blog-category">Category</Label>
              <Select defaultValue={editingBlog?.category || ""}>
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
              <Label htmlFor="blog-image">Featured Image</Label>
              <div className="space-y-2">
                <Input
                  id="blog-image"
                  type="url"
                  defaultValue={editingBlog?.image || ""}
                  placeholder="Enter image URL or upload an image"
                />
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
                {editingBlog?.image && (
                  <div className="mt-2">
                    <img
                      src={editingBlog.image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="blog-excerpt">Excerpt</Label>
              <Textarea
                id="blog-excerpt"
                defaultValue={editingBlog?.excerpt || ""}
                placeholder="Brief description of the blog post"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="blog-content">Content</Label>
              <Textarea
                id="blog-content"
                placeholder="Write your blog post content here..."
                className="min-h-[150px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="blog-status">Status</Label>
              <Select defaultValue={editingBlog?.status || "draft"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Save as Draft</Button>
            <Button type="submit">{editingBlog ? "Update Post" : "Publish Post"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Modal */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new category for organizing your blog posts.</DialogDescription>
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
            <DialogTitle>Manage Blog Categories</DialogTitle>
            <DialogDescription>
              View, add, or remove blog categories. Categories that are in use cannot be deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Blog Posts</TableHead>
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
