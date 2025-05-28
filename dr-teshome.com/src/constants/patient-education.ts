import { ArrowLeft, Bone, Activity, Shield, Search, Zap, Heart, Users } from "lucide-react"

export const orthopedicCategories = [
    {
      id: "bone-health",
      title: "Bone Health & Fractures",
      icon: Bone,
      color: "bg-blue-100 text-blue-600",
      articles: [
        {
          title: "Understanding Bone Fractures",
          description: "Types of fractures, healing process, and what to expect during recovery.",
          readTime: "8 min read",
        },
        {
          title: "Osteoporosis Prevention and Management",
          description: "How to maintain strong bones and prevent osteoporosis as you age.",
          readTime: "6 min read",
        },
        {
          title: "Calcium and Vitamin D for Bone Health",
          description: "Essential nutrients for strong bones and dietary sources.",
          readTime: "5 min read",
        },
        {
          title: "Bone Healing: What Affects Recovery Time",
          description: "Factors that influence how quickly bones heal after injury.",
          readTime: "7 min read",
        },
      ],
    },
    {
      id: "joint-care",
      title: "Joint Care & Arthritis",
      icon: Activity,
      color: "bg-green-100 text-green-600",
      articles: [
        {
          title: "Understanding Arthritis: Types and Symptoms",
          description: "Comprehensive guide to osteoarthritis, rheumatoid arthritis, and other joint conditions.",
          readTime: "10 min read",
        },
        {
          title: "Joint-Friendly Exercises",
          description: "Safe exercises to maintain joint mobility and reduce arthritis pain.",
          readTime: "8 min read",
        },
        {
          title: "When to Consider Joint Replacement",
          description: "Signs that indicate you might benefit from hip or knee replacement surgery.",
          readTime: "9 min read",
        },
        {
          title: "Managing Joint Pain Without Surgery",
          description: "Non-surgical treatments for joint pain including therapy and lifestyle changes.",
          readTime: "7 min read",
        },
      ],
    },
    {
      id: "spine-health",
      title: "Spine Health & Back Pain",
      icon: Shield,
      color: "bg-purple-100 text-purple-600",
      articles: [
        {
          title: "Common Causes of Back Pain",
          description: "Understanding herniated discs, muscle strains, and other spine conditions.",
          readTime: "8 min read",
        },
        {
          title: "Proper Posture for Spine Health",
          description: "How to maintain good posture at work, home, and during activities.",
          readTime: "6 min read",
        },
        {
          title: "Core Strengthening for Back Support",
          description: "Exercises to strengthen your core muscles and support your spine.",
          readTime: "7 min read",
        },
        {
          title: "When Back Pain Requires Surgery",
          description: "Understanding spinal surgery options and when they're necessary.",
          readTime: "9 min read",
        },
      ],
    },
    {
      id: "sports-injuries",
      title: "Sports Injuries & Recovery",
      icon: Zap,
      color: "bg-red-100 text-red-600",
      articles: [
        {
          title: "Common Sports Injuries and Prevention",
          description: "ACL tears, meniscus injuries, and how to prevent sports-related injuries.",
          readTime: "10 min read",
        },
        {
          title: "RICE Protocol for Acute Injuries",
          description: "Rest, Ice, Compression, Elevation - immediate care for sports injuries.",
          readTime: "5 min read",
        },
        {
          title: "Returning to Sports After Injury",
          description: "Safe guidelines for getting back to your sport after orthopedic injury.",
          readTime: "8 min read",
        },
        {
          title: "Strength Training for Injury Prevention",
          description: "Building strength and flexibility to prevent future injuries.",
          readTime: "7 min read",
        },
      ],
    },
    {
      id: "surgery-recovery",
      title: "Surgery & Recovery",
      icon: Heart,
      color: "bg-yellow-100 text-yellow-600",
      articles: [
        {
          title: "Preparing for Orthopedic Surgery",
          description: "What to expect before, during, and after orthopedic procedures.",
          readTime: "12 min read",
        },
        {
          title: "Post-Surgery Rehabilitation",
          description: "The importance of physical therapy and rehabilitation after surgery.",
          readTime: "9 min read",
        },
        {
          title: "Managing Pain After Surgery",
          description: "Safe and effective pain management strategies during recovery.",
          readTime: "7 min read",
        },
        {
          title: "Complications to Watch For",
          description: "Warning signs that require immediate medical attention after surgery.",
          readTime: "6 min read",
        },
      ],
    },
    {
      id: "pediatric-orthopedics",
      title: "Pediatric Orthopedics",
      icon: Users,
      color: "bg-indigo-100 text-indigo-600",
      articles: [
        {
          title: "Common Childhood Orthopedic Conditions",
          description: "Scoliosis, flat feet, and other conditions affecting children's bones and joints.",
          readTime: "8 min read",
        },
        {
          title: "Growing Pains: What's Normal",
          description: "Understanding when growing pains are normal and when to seek help.",
          readTime: "6 min read",
        },
        {
          title: "Sports Safety for Young Athletes",
          description: "Preventing overuse injuries and keeping young athletes healthy.",
          readTime: "7 min read",
        },
        {
          title: "Proper Nutrition for Growing Bones",
          description: "Essential nutrients for healthy bone development in children.",
          readTime: "5 min read",
        },
      ],
    },
  ]
