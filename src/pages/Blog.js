import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import debounce from "lodash/debounce";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setCurrentPage(1); // Reset to first page on new search
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    debouncedSearch(query);
  };

  const featuredPost = {
    id: "science-of-productivity",
    title: "The Science of Productivity: How to Achieve More in Less Time",
    excerpt:
      "Discover the latest research-backed techniques for maximizing your productivity and achieving your goals faster than ever before. Learn about the psychology of motivation, time management strategies, and how to create sustainable habits that lead to long-term success.",
    author: "Dr. Sarah Johnson",
    date: "March 20, 2024",
    readTime: "8 min read",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    tags: ["Productivity", "Time Management", "Research", "Habits"],
  };

  const posts = [
    {
      id: "habits-of-successful-people",
      title: "10 Habits of Highly Successful People",
      excerpt:
        "Learn the daily habits that set successful individuals apart and how you can implement them in your life.",
      author: "Michael Chen",
      date: "March 18, 2024",
      readTime: "6 min read",
      category: "Success",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      tags: ["Success", "Habits", "Personal Development"],
    },
    {
      id: "morning-routines",
      title: "The Power of Morning Routines",
      excerpt:
        "How starting your day right can transform your productivity and overall well-being.",
      author: "Emma Davis",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      tags: ["Morning Routine", "Wellness", "Productivity"],
    },
    {
      id: "goal-setting",
      title: "Goal Setting Strategies That Work",
      excerpt:
        "Master the art of setting and achieving your goals with these proven strategies.",
      author: "David Wilson",
      date: "March 12, 2024",
      readTime: "7 min read",
      category: "Goals",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      tags: ["Goals", "Strategy", "Achievement"],
    },
    {
      id: "mindfulness-digital",
      title: "Mindfulness in the Digital Age",
      excerpt:
        "Discover how to maintain mindfulness and mental well-being in our increasingly digital world.",
      author: "Lisa Thompson",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
      tags: ["Mindfulness", "Digital Wellness", "Mental Health"],
    },
    {
      id: "future-development",
      title: "The Future of Personal Development",
      excerpt:
        "Explore emerging trends in personal development and how technology is shaping growth.",
      author: "James Anderson",
      date: "March 8, 2024",
      readTime: "8 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      tags: ["Technology", "Future", "Innovation"],
    },
    {
      id: "building-resilience",
      title: "Building Resilience in Challenging Times",
      excerpt:
        "Learn how to develop mental resilience and maintain a positive mindset during difficult periods.",
      author: "Maria Rodriguez",
      date: "March 5, 2024",
      readTime: "7 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      tags: ["Resilience", "Mental Health", "Growth"],
    },
    {
      id: "time-management",
      title: "Advanced Time Management Techniques",
      excerpt:
        "Discover cutting-edge time management strategies used by top performers.",
      author: "Alex Turner",
      date: "March 3, 2024",
      readTime: "6 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      tags: ["Time Management", "Productivity", "Efficiency"],
    },
    {
      id: "sleep-optimization",
      title: "Sleep Optimization for Peak Performance",
      excerpt:
        "How quality sleep can dramatically improve your daily performance and well-being.",
      author: "Sarah Chen",
      date: "March 1, 2024",
      readTime: "5 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484",
      tags: ["Sleep", "Wellness", "Performance"],
    },
    {
      id: "digital-detox",
      title: "The Art of Digital Detox",
      excerpt:
        "Learn how to maintain a healthy relationship with technology in the modern age.",
      author: "John Martinez",
      date: "Feb 28, 2024",
      readTime: "7 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      tags: ["Digital Wellness", "Technology", "Balance"],
    },
    {
      id: "focus-techniques",
      title: "Mastering Deep Focus",
      excerpt:
        "Techniques to achieve and maintain deep focus in a world full of distractions.",
      author: "Rachel Kim",
      date: "Feb 26, 2024",
      readTime: "6 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      tags: ["Focus", "Productivity", "Concentration"],
    },
    {
      id: "stress-management",
      title: "Effective Stress Management",
      excerpt:
        "Proven strategies for managing stress and maintaining mental well-being.",
      author: "Dr. Emily Watson",
      date: "Feb 24, 2024",
      readTime: "8 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1516302758847-719703c1b9c0",
      tags: ["Stress", "Mental Health", "Wellness"],
    },
    {
      id: "habit-formation",
      title: "The Science of Habit Formation",
      excerpt:
        "Understanding the psychology behind habit formation and how to create lasting change.",
      author: "Dr. Mark Johnson",
      date: "Feb 22, 2024",
      readTime: "7 min read",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      tags: ["Habits", "Psychology", "Behavior"],
    },
    {
      id: "work-life-balance",
      title: "Achieving Work-Life Balance",
      excerpt:
        "Practical strategies for maintaining harmony between professional and personal life.",
      author: "Sophie Anderson",
      date: "Feb 20, 2024",
      readTime: "6 min read",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      tags: ["Work-Life Balance", "Lifestyle", "Wellness"],
    },
    {
      id: "mindset-shift",
      title: "The Power of Mindset Shifts",
      excerpt:
        "How changing your perspective can transform your life and career.",
      author: "Daniel Lee",
      date: "Feb 18, 2024",
      readTime: "5 min read",
      category: "Personal Development",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      tags: ["Mindset", "Personal Growth", "Psychology"],
    },
    {
      id: "energy-management",
      title: "Energy Management for Peak Performance",
      excerpt: "Learn how to optimize your energy levels throughout the day.",
      author: "Jessica Park",
      date: "Feb 16, 2024",
      readTime: "7 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484",
      tags: ["Energy", "Performance", "Productivity"],
    },
    {
      id: "creative-thinking",
      title: "Enhancing Creative Thinking",
      excerpt:
        "Techniques to boost creativity and innovative thinking in your daily life.",
      author: "Thomas Wright",
      date: "Feb 14, 2024",
      readTime: "6 min read",
      category: "Creativity",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      tags: ["Creativity", "Innovation", "Thinking"],
    },
    {
      id: "emotional-intelligence",
      title: "Developing Emotional Intelligence",
      excerpt:
        "Master the art of emotional intelligence for better relationships and success.",
      author: "Dr. Lisa Chen",
      date: "Feb 12, 2024",
      readTime: "8 min read",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1516302758847-719703c1b9c0",
      tags: ["Emotional Intelligence", "Psychology", "Relationships"],
    },
    {
      id: "decision-making",
      title: "Better Decision Making",
      excerpt:
        "Learn how to make better decisions in both personal and professional life.",
      author: "Robert Kim",
      date: "Feb 10, 2024",
      readTime: "7 min read",
      category: "Personal Development",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      tags: ["Decision Making", "Personal Growth", "Leadership"],
    },
    {
      id: "communication-skills",
      title: "Mastering Communication Skills",
      excerpt:
        "Essential communication skills for personal and professional success.",
      author: "Amanda Wilson",
      date: "Feb 8, 2024",
      readTime: "6 min read",
      category: "Communication",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      tags: ["Communication", "Skills", "Professional Development"],
    },
    {
      id: "leadership-development",
      title: "Leadership Development Essentials",
      excerpt: "Key principles and practices for becoming an effective leader.",
      author: "Michael Brown",
      date: "Feb 6, 2024",
      readTime: "8 min read",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484",
      tags: ["Leadership", "Development", "Management"],
    },
    {
      id: "productivity-mindset",
      title: "The Productivity Mindset: Shifting Your Perspective",
      excerpt:
        "Learn how to cultivate a mindset that naturally leads to greater productivity and success.",
      author: "Dr. Sarah Johnson",
      date: "Feb 4, 2024",
      readTime: "7 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      tags: ["Productivity", "Mindset", "Success"],
    },
    {
      id: "productivity-tools",
      title: "Essential Productivity Tools for 2024",
      excerpt:
        "Discover the most effective tools and apps that can boost your productivity this year.",
      author: "Alex Turner",
      date: "Feb 2, 2024",
      readTime: "6 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      tags: ["Productivity", "Tools", "Technology"],
    },
    {
      id: "productivity-routines",
      title: "Building Effective Daily Routines",
      excerpt:
        "How to create and maintain routines that enhance your daily productivity.",
      author: "Emma Davis",
      date: "Jan 31, 2024",
      readTime: "8 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484",
      tags: ["Productivity", "Routines", "Habits"],
    },
    {
      id: "wellness-mindfulness",
      title: "Mindfulness Practices for Daily Wellness",
      excerpt:
        "Simple mindfulness techniques to improve your overall well-being.",
      author: "Dr. Lisa Chen",
      date: "Feb 3, 2024",
      readTime: "6 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1516302758847-719703c1b9c0",
      tags: ["Wellness", "Mindfulness", "Mental Health"],
    },
    {
      id: "wellness-nutrition",
      title: "Nutrition for Optimal Wellness",
      excerpt:
        "Understanding how proper nutrition impacts your overall well-being.",
      author: "Sarah Chen",
      date: "Feb 1, 2024",
      readTime: "7 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
      tags: ["Wellness", "Nutrition", "Health"],
    },
    {
      id: "wellness-exercise",
      title: "Exercise and Mental Wellness",
      excerpt:
        "The connection between physical activity and mental well-being.",
      author: "Michael Brown",
      date: "Jan 30, 2024",
      readTime: "6 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      tags: ["Wellness", "Exercise", "Mental Health"],
    },
    {
      id: "goal-achievement",
      title: "The Psychology of Goal Achievement",
      excerpt:
        "Understanding the mental processes behind successful goal attainment.",
      author: "Dr. Mark Johnson",
      date: "Feb 5, 2024",
      readTime: "8 min read",
      category: "Goals",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      tags: ["Goals", "Psychology", "Achievement"],
    },
    {
      id: "goal-tracking",
      title: "Effective Goal Tracking Methods",
      excerpt:
        "Learn the best ways to track and measure your progress towards goals.",
      author: "David Wilson",
      date: "Feb 3, 2024",
      readTime: "6 min read",
      category: "Goals",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      tags: ["Goals", "Tracking", "Progress"],
    },
    {
      id: "goal-motivation",
      title: "Sustaining Motivation for Long-term Goals",
      excerpt:
        "How to maintain motivation when working towards distant objectives.",
      author: "Rachel Kim",
      date: "Feb 1, 2024",
      readTime: "7 min read",
      category: "Goals",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      tags: ["Goals", "Motivation", "Long-term"],
    },
    {
      id: "success-principles",
      title: "Core Principles of Success",
      excerpt: "The fundamental principles that drive success in any field.",
      author: "Michael Chen",
      date: "Feb 4, 2024",
      readTime: "8 min read",
      category: "Success",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      tags: ["Success", "Principles", "Achievement"],
    },
    {
      id: "success-mindset",
      title: "The Success Mindset",
      excerpt: "Developing the mental framework for achieving success.",
      author: "James Anderson",
      date: "Feb 2, 2024",
      readTime: "6 min read",
      category: "Success",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      tags: ["Success", "Mindset", "Growth"],
    },
    {
      id: "success-habits",
      title: "Daily Habits of Successful People",
      excerpt: "The daily practices that contribute to long-term success.",
      author: "Sophie Anderson",
      date: "Jan 31, 2024",
      readTime: "7 min read",
      category: "Success",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      tags: ["Success", "Habits", "Daily Practice"],
    },
    {
      id: "tech-productivity",
      title: "Technology for Enhanced Productivity",
      excerpt: "How to leverage technology to boost your productivity.",
      author: "Thomas Wright",
      date: "Feb 5, 2024",
      readTime: "6 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      tags: ["Technology", "Productivity", "Tools"],
    },
    {
      id: "tech-wellness",
      title: "Technology and Mental Wellness",
      excerpt: "Balancing technology use for better mental health.",
      author: "Jessica Park",
      date: "Feb 3, 2024",
      readTime: "7 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      tags: ["Technology", "Wellness", "Digital Balance"],
    },
    {
      id: "tech-future",
      title: "The Future of Personal Technology",
      excerpt: "Emerging technologies that will shape personal development.",
      author: "Daniel Lee",
      date: "Feb 1, 2024",
      readTime: "8 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      tags: ["Technology", "Future", "Innovation"],
    },
    {
      id: "psychology-habits",
      title: "The Psychology of Habit Formation",
      excerpt: "Understanding the science behind habit development.",
      author: "Dr. Emily Watson",
      date: "Feb 4, 2024",
      readTime: "7 min read",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484",
      tags: ["Psychology", "Habits", "Behavior"],
    },
    {
      id: "psychology-motivation",
      title: "The Psychology of Motivation",
      excerpt:
        "Understanding what drives human motivation and how to harness it.",
      author: "Dr. Mark Johnson",
      date: "Feb 2, 2024",
      readTime: "8 min read",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1516302758847-719703c1b9c0",
      tags: ["Psychology", "Motivation", "Behavior"],
    },
    {
      id: "psychology-success",
      title: "The Psychology of Success",
      excerpt: "Mental patterns and behaviors that lead to success.",
      author: "Dr. Lisa Chen",
      date: "Jan 31, 2024",
      readTime: "6 min read",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      tags: ["Psychology", "Success", "Behavior"],
    },
    {
      id: "leadership-skills",
      title: "Essential Leadership Skills",
      excerpt: "Core skills every effective leader should develop.",
      author: "Michael Brown",
      date: "Feb 5, 2024",
      readTime: "7 min read",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      tags: ["Leadership", "Skills", "Development"],
    },
    {
      id: "leadership-communication",
      title: "Leadership Communication",
      excerpt: "Effective communication strategies for leaders.",
      author: "Amanda Wilson",
      date: "Feb 3, 2024",
      readTime: "6 min read",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      tags: ["Leadership", "Communication", "Skills"],
    },
    {
      id: "leadership-team",
      title: "Building High-Performing Teams",
      excerpt: "How to create and lead successful teams.",
      author: "Robert Kim",
      date: "Feb 1, 2024",
      readTime: "8 min read",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      tags: ["Leadership", "Teams", "Management"],
    },
    {
      id: "personal-growth",
      title: "The Journey of Personal Growth",
      excerpt:
        "Understanding and navigating your personal development journey.",
      author: "Daniel Lee",
      date: "Feb 4, 2024",
      readTime: "7 min read",
      category: "Personal Development",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      tags: ["Personal Development", "Growth", "Journey"],
    },
    {
      id: "personal-skills",
      title: "Essential Personal Development Skills",
      excerpt: "Key skills to focus on for personal growth.",
      author: "Sophie Anderson",
      date: "Feb 2, 2024",
      readTime: "6 min read",
      category: "Personal Development",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484",
      tags: ["Personal Development", "Skills", "Growth"],
    },
    {
      id: "personal-mindset",
      title: "Growth Mindset Development",
      excerpt: "Cultivating a mindset that fosters personal growth.",
      author: "Jessica Park",
      date: "Jan 31, 2024",
      readTime: "8 min read",
      category: "Personal Development",
      image: "https://images.unsplash.com/photo-1516302758847-719703c1b9c0",
      tags: ["Personal Development", "Mindset", "Growth"],
    },
    {
      id: "communication-skills",
      title: "Advanced Communication Skills",
      excerpt: "Taking your communication skills to the next level.",
      author: "Amanda Wilson",
      date: "Feb 5, 2024",
      readTime: "7 min read",
      category: "Communication",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      tags: ["Communication", "Skills", "Development"],
    },
    {
      id: "communication-workplace",
      title: "Workplace Communication",
      excerpt: "Effective communication strategies for the workplace.",
      author: "Thomas Wright",
      date: "Feb 3, 2024",
      readTime: "6 min read",
      category: "Communication",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      tags: ["Communication", "Workplace", "Professional"],
    },
    {
      id: "communication-relationships",
      title: "Communication in Relationships",
      excerpt: "Building stronger relationships through better communication.",
      author: "Rachel Kim",
      date: "Feb 1, 2024",
      readTime: "8 min read",
      category: "Communication",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484",
      tags: ["Communication", "Relationships", "Personal"],
    },
    {
      id: "creativity-techniques",
      title: "Creative Thinking Techniques",
      excerpt: "Practical methods to enhance your creative thinking.",
      author: "Thomas Wright",
      date: "Feb 4, 2024",
      readTime: "7 min read",
      category: "Creativity",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      tags: ["Creativity", "Thinking", "Innovation"],
    },
    {
      id: "creativity-workplace",
      title: "Fostering Creativity at Work",
      excerpt: "Creating an environment that encourages creative thinking.",
      author: "Jessica Park",
      date: "Feb 2, 2024",
      readTime: "6 min read",
      category: "Creativity",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      tags: ["Creativity", "Workplace", "Innovation"],
    },
    {
      id: "creativity-problem-solving",
      title: "Creative Problem Solving",
      excerpt: "Using creativity to solve complex problems.",
      author: "Daniel Lee",
      date: "Jan 31, 2024",
      readTime: "8 min read",
      category: "Creativity",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484",
      tags: ["Creativity", "Problem Solving", "Innovation"],
    },
    {
      id: "lifestyle-balance",
      title: "Achieving Life Balance",
      excerpt: "Strategies for maintaining balance in all aspects of life.",
      author: "Sophie Anderson",
      date: "Feb 5, 2024",
      readTime: "7 min read",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1516302758847-719703c1b9c0",
      tags: ["Lifestyle", "Balance", "Well-being"],
    },
    {
      id: "lifestyle-health",
      title: "Healthy Lifestyle Habits",
      excerpt: "Building habits for a healthier lifestyle.",
      author: "Sarah Chen",
      date: "Feb 3, 2024",
      readTime: "6 min read",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
      tags: ["Lifestyle", "Health", "Habits"],
    },
    {
      id: "lifestyle-productivity",
      title: "Productive Lifestyle Design",
      excerpt: "Designing your lifestyle for maximum productivity.",
      author: "Emma Davis",
      date: "Feb 1, 2024",
      readTime: "8 min read",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      tags: ["Lifestyle", "Productivity", "Design"],
    },
  ];

  const categories = [
    { name: "All", count: posts.length },
    {
      name: "Productivity",
      count: posts.filter((post) => post.category === "Productivity").length,
    },
    {
      name: "Wellness",
      count: posts.filter((post) => post.category === "Wellness").length,
    },
    {
      name: "Goals",
      count: posts.filter((post) => post.category === "Goals").length,
    },
    {
      name: "Success",
      count: posts.filter((post) => post.category === "Success").length,
    },
    {
      name: "Technology",
      count: posts.filter((post) => post.category === "Technology").length,
    },
    {
      name: "Psychology",
      count: posts.filter((post) => post.category === "Psychology").length,
    },
    {
      name: "Leadership",
      count: posts.filter((post) => post.category === "Leadership").length,
    },
    {
      name: "Personal Development",
      count: posts.filter((post) => post.category === "Personal Development")
        .length,
    },
    {
      name: "Communication",
      count: posts.filter((post) => post.category === "Communication").length,
    },
    {
      name: "Creativity",
      count: posts.filter((post) => post.category === "Creativity").length,
    },
    {
      name: "Lifestyle",
      count: posts.filter((post) => post.category === "Lifestyle").length,
    },
  ];

  const popularTags = [
    "Productivity",
    "Wellness",
    "Goals",
    "Success",
    "Technology",
    "Mindfulness",
    "Leadership",
    "Time Management",
    "Personal Development",
    "Mental Health",
    "Digital Wellness",
    "Innovation",
  ];

  const filteredPosts = posts.filter((post) => {
    const searchTerms = searchQuery
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0);

    if (searchTerms.length === 0) {
      return selectedCategory === "All" || post.category === selectedCategory;
    }

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    const matchesSearch = searchTerms.every((term) => {
      return (
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term)) ||
        post.category.toLowerCase().includes(term)
      );
    });

    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and stories to help you achieve your goals and live
            your best life.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, author, tags, or category..."
              onChange={handleSearchChange}
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-md"
            />
            <i className="fas fa-search absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-600">
              Found {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "result" : "results"} for "
              {searchQuery}"
            </div>
          )}
        </motion.div>

        {/* Featured Post */}
        <Link to={`/blog/${featuredPost.id}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-indigo-100 mb-8 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-48 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600 mb-3">
                  {featuredPost.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i className="fas fa-user text-indigo-600 text-sm"></i>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {featuredPost.author}
                      </div>
                      <div className="text-xs text-gray-500">
                        {featuredPost.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {featuredPost.readTime}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentPosts.map((post, index) => (
                <Link key={index} to={`/blog/${post.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-indigo-100 cursor-pointer hover:shadow-xl transition-shadow h-full"
                  >
                    <div className="relative h-40">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600 mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                            <i className="fas fa-user text-indigo-600 text-xs"></i>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-xs">
                              {post.author}
                            </div>
                            <div className="text-xs text-gray-500">
                              {post.date}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show first page, last page, current page, and pages around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === pageNumber
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-indigo-600 hover:bg-indigo-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span key={pageNumber} className="px-2">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}

            {/* No Results Message */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Categories
              </h3>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? "bg-indigo-100 text-indigo-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-gray-600">{category.name}</span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-600">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-600 mb-6">
                Get the latest articles and insights delivered straight to your
                inbox.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Recent Posts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Recent Posts
              </h3>
              <div className="space-y-6">
                {posts.slice(0, 3).map((post, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="text-sm text-gray-500">
                        {post.date} · {post.readTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
