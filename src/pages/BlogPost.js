import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";

const BlogPost = () => {
  const { id } = useParams();

  // In a real application, this would come from an API or database
  const blogPosts = {
    "science-of-productivity": {
      title: "The Science of Productivity: How to Achieve More in Less Time",
      author: "Dr. Sarah Johnson",
      authorBio:
        "Dr. Sarah Johnson is a cognitive psychologist and productivity expert with over 15 years of experience in behavioral science. She holds a Ph.D. from Stanford University and has published numerous papers on productivity and human performance.",
      date: "March 20, 2024",
      readTime: "8 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      tags: ["Productivity", "Time Management", "Research", "Habits"],
      content: `
        <h2>The Psychology of Productivity</h2>
        <p>In today's fast-paced world, understanding the science behind productivity is more important than ever. Recent research in cognitive psychology has revealed fascinating insights into how our brains process information and manage tasks.</p>

        <h3>The Role of Dopamine in Motivation</h3>
        <p>Dopamine, often called the "motivation molecule," plays a crucial role in our productivity. When we complete tasks, our brain releases dopamine, creating a sense of accomplishment and reinforcing productive behavior. Understanding this neurological process can help us structure our work more effectively.</p>

        <h3>Time Management Strategies</h3>
        <p>One of the most effective approaches to productivity is the Pomodoro Technique, developed by Francesco Cirillo in the late 1980s. This method involves working in focused 25-minute intervals, followed by short breaks. Research shows that this approach can increase productivity by up to 40%.</p>

        <h3>Creating Sustainable Habits</h3>
        <p>Building sustainable habits is key to long-term productivity. According to a study published in the European Journal of Social Psychology, it takes an average of 66 days to form a new habit. Here are some proven strategies:</p>
        <ul>
          <li>Start small and build gradually</li>
          <li>Use habit stacking (attaching new habits to existing ones)</li>
          <li>Track your progress</li>
          <li>Celebrate small wins</li>
        </ul>

        <h3>The Impact of Environment</h3>
        <p>Your physical environment significantly affects your productivity. Research from the University of California shows that workers in well-designed spaces are 15% more productive. Consider these factors:</p>
        <ul>
          <li>Natural lighting</li>
          <li>Ergonomic furniture</li>
          <li>Plants and nature elements</li>
          <li>Temperature control</li>
        </ul>

        <h3>Digital Distractions</h3>
        <p>In our digital age, managing distractions is crucial. A study by the University of California, Irvine found that it takes an average of 23 minutes to regain focus after an interruption. Here are some strategies to minimize digital distractions:</p>
        <ul>
          <li>Use website blockers during focused work</li>
          <li>Schedule specific times for email and social media</li>
          <li>Turn off notifications</li>
          <li>Use the "Do Not Disturb" feature</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Productivity isn't just about working harder—it's about working smarter. By understanding the science behind productivity and implementing evidence-based strategies, you can achieve more while maintaining a healthy work-life balance.</p>
      `,
    },
    "habits-of-successful-people": {
      title: "10 Habits of Highly Successful People",
      author: "Michael Chen",
      authorBio:
        "Michael Chen is a leadership coach and business consultant with 20 years of experience working with Fortune 500 companies. He specializes in organizational behavior and personal development.",
      date: "March 18, 2024",
      readTime: "6 min read",
      category: "Success",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      tags: ["Success", "Habits", "Personal Development"],
      content: `
        <h2>The Power of Daily Habits</h2>
        <p>Success isn't an accident—it's the result of consistent, daily habits. After studying hundreds of successful individuals across various fields, I've identified 10 key habits that consistently appear in their routines.</p>

        <h3>1. Early Rising</h3>
        <p>Successful people often start their day before the sun rises. Apple CEO Tim Cook wakes up at 3:45 AM, while former First Lady Michelle Obama starts her day at 4:30 AM. This early start provides quiet time for planning and personal development.</p>

        <h3>2. Regular Exercise</h3>
        <p>Physical activity is non-negotiable for high achievers. Richard Branson, founder of Virgin Group, starts his day with a workout, claiming it gives him four extra productive hours. Exercise improves cognitive function and reduces stress.</p>

        <h3>3. Continuous Learning</h3>
        <p>Warren Buffett spends 80% of his day reading. Bill Gates reads 50 books per year. Successful people understand that learning is a lifelong process that keeps them ahead of the curve.</p>

        <h3>4. Goal Setting</h3>
        <p>High achievers set clear, measurable goals. They break down large objectives into manageable tasks and track their progress regularly. This systematic approach ensures consistent progress.</p>

        <h3>5. Time Management</h3>
        <p>Successful people are masters of their time. They use techniques like time blocking and the 80/20 rule to maximize productivity. They understand that time is their most valuable resource.</p>

        <h3>6. Networking</h3>
        <p>Building and maintaining relationships is crucial. Successful people actively cultivate their network, understanding that opportunities often come through connections.</p>

        <h3>7. Mindfulness Practice</h3>
        <p>Many successful individuals practice meditation or mindfulness. Ray Dalio, founder of Bridgewater Associates, credits meditation for his success in the financial world.</p>

        <h3>8. Healthy Eating</h3>
        <p>Nutrition directly impacts cognitive function. Successful people prioritize healthy eating habits to maintain energy and focus throughout the day.</p>

        <h3>9. Regular Reflection</h3>
        <p>Taking time to reflect on progress and learn from experiences is a common habit among successful people. This practice helps them make better decisions and avoid repeating mistakes.</p>

        <h3>10. Consistent Sleep Schedule</h3>
        <p>Quality sleep is essential for peak performance. Successful people maintain consistent sleep schedules and prioritize getting 7-8 hours of sleep each night.</p>

        <h3>Implementing These Habits</h3>
        <p>Remember that habits take time to form. Start with one or two habits and build from there. Consistency is key—small daily actions lead to significant long-term results.</p>
      `,
    },
    // Add more detailed blog posts here
  };

  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              to="/blog"
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-600 mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <i className="fas fa-user text-indigo-600"></i>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{post.author}</div>
                  <div className="text-sm text-gray-500">{post.date}</div>
                </div>
              </div>
              <div className="text-gray-500">{post.readTime}</div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              About the Author
            </h3>
            <p className="text-gray-600">{post.authorBio}</p>
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
