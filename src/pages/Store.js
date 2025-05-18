import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const storeItems = {
  themes: [
    {
      id: "dark-mode",
      name: "Dark Mode Theme",
      description:
        "Unlock a sleek dark mode for your dashboard\nPerfect for late-night productivity",
      points: 500,
      icon: "fa-palette",
      color: "blue",
    },
    {
      id: "nature-theme",
      name: "Nature Theme",
      description:
        "A calming nature-inspired color scheme\nBrings the outdoors to your workspace",
      points: 750,
      icon: "fa-leaf",
      color: "green",
    },
    {
      id: "ocean-theme",
      name: "Ocean Theme",
      description:
        "Dive into a refreshing ocean-inspired design\nCalming blues and teals for focus",
      points: 750,
      icon: "fa-water",
      color: "cyan",
    },
    {
      id: "sunset-theme",
      name: "Sunset Theme",
      description:
        "Warm sunset colors for your dashboard\nCreates a cozy, inspiring atmosphere",
      points: 750,
      icon: "fa-sun",
      color: "orange",
    },
  ],
  features: [
    {
      id: "advanced-analytics",
      name: "Advanced Analytics",
      description:
        "Get detailed insights and custom reports\nTrack your progress with precision",
      points: 1000,
      icon: "fa-chart-line",
      color: "purple",
    },
    {
      id: "ai-assistant",
      name: "AI Assistant",
      description:
        "Get personalized recommendations and insights\nYour AI-powered productivity partner",
      points: 2000,
      icon: "fa-robot",
      color: "indigo",
    },
    {
      id: "export-data",
      name: "Data Export",
      description:
        "Export your data in multiple formats\nKeep your progress backed up and portable",
      points: 500,
      icon: "fa-file-export",
      color: "blue",
    },
    {
      id: "custom-widgets",
      name: "Custom Widgets",
      description:
        "Create and customize your own dashboard widgets\nBuild your perfect workspace",
      points: 1500,
      icon: "fa-puzzle-piece",
      color: "pink",
    },
  ],
  customization: [
    {
      id: "custom-dashboard",
      name: "Custom Dashboard",
      description:
        "Personalize your dashboard layout\nArrange everything your way",
      points: 750,
      icon: "fa-paint-brush",
      color: "pink",
    },
    {
      id: "custom-icons",
      name: "Custom Icons",
      description: "Choose from premium icon sets\nExpress your unique style",
      points: 500,
      icon: "fa-icons",
      color: "purple",
    },
    {
      id: "custom-fonts",
      name: "Custom Fonts",
      description:
        "Access premium typography options\nMake your dashboard uniquely yours",
      points: 500,
      icon: "fa-font",
      color: "indigo",
    },
    {
      id: "custom-animations",
      name: "Custom Animations",
      description:
        "Add premium animations to your dashboard\nBring your workspace to life",
      points: 1000,
      icon: "fa-film",
      color: "blue",
    },
  ],
  premium: [
    {
      id: "premium-badge",
      name: "Premium Badge",
      description: "Show off your premium status\nStand out in the community",
      points: 2000,
      icon: "fa-crown",
      color: "amber",
    },
    {
      id: "priority-support",
      name: "Priority Support",
      description:
        "Get faster responses from our support team\nYour questions answered first",
      points: 1500,
      icon: "fa-headset",
      color: "green",
    },
    {
      id: "early-access",
      name: "Early Access",
      description:
        "Try new features before anyone else\nBe the first to experience updates",
      points: 1000,
      icon: "fa-rocket",
      color: "red",
    },
  ],
  physical: [
    {
      id: "momentum-mug",
      name: "Momentum Mug",
      description:
        "Premium ceramic mug with Momentum branding\nPerfect for your morning coffee",
      points: 2500,
      icon: "fa-mug-hot",
      color: "brown",
      image: "mug.jpg",
    },
    {
      id: "momentum-notebook",
      name: "Momentum Notebook",
      description:
        "Premium leather-bound notebook\nCapture your ideas in style",
      points: 3000,
      icon: "fa-book",
      color: "brown",
      image: "notebook.jpg",
    },
    {
      id: "momentum-hoodie",
      name: "Momentum Hoodie",
      description:
        "Comfortable hoodie with Momentum logo\nStay cozy while staying productive",
      points: 5000,
      icon: "fa-tshirt",
      color: "gray",
      image: "hoodie.jpg",
    },
    {
      id: "momentum-stickers",
      name: "Sticker Pack",
      description:
        "Set of 5 premium vinyl stickers\nShow your Momentum pride anywhere",
      points: 1000,
      icon: "fa-sticky-note",
      color: "yellow",
      image: "stickers.jpg",
    },
  ],
  digital: [
    {
      id: "spotify-premium",
      name: "Spotify Premium (1 Month)",
      description:
        "Enjoy ad-free music streaming\nPerfect for focused work sessions",
      points: 4000,
      icon: "fa-spotify",
      color: "green",
      image: "spotify.jpg",
    },
    {
      id: "netflix-gift",
      name: "Netflix Gift Card ($10)",
      description:
        "Watch your favorite shows and movies\nTake a well-deserved break",
      points: 5000,
      icon: "fa-film",
      color: "red",
      image: "netflix.jpg",
    },
    {
      id: "amazon-gift",
      name: "Amazon Gift Card ($10)",
      description:
        "Shop for anything on Amazon\nTreat yourself to something special",
      points: 5000,
      icon: "fa-shopping-cart",
      color: "orange",
      image: "amazon.jpg",
    },
    {
      id: "udemy-course",
      name: "Udemy Course Credit",
      description:
        "Learn something new with a premium course\nInvest in your growth",
      points: 6000,
      icon: "fa-graduation-cap",
      color: "purple",
      image: "udemy.jpg",
    },
  ],
  experiences: [
    {
      id: "virtual-coaching",
      name: "Virtual Coaching Session",
      description:
        "One-on-one session with a productivity coach\nGet personalized guidance",
      points: 8000,
      icon: "fa-user-tie",
      color: "blue",
      image: "coaching.jpg",
    },
    {
      id: "workshop-access",
      name: "Premium Workshop Access",
      description:
        "Access to exclusive productivity workshops\nLearn from the best",
      points: 5000,
      icon: "fa-chalkboard-teacher",
      color: "purple",
      image: "workshop.jpg",
    },
    {
      id: "masterclass",
      name: "Productivity Masterclass",
      description:
        "Learn from industry experts\nTake your skills to the next level",
      points: 10000,
      icon: "fa-star",
      color: "amber",
      image: "masterclass.jpg",
    },
  ],
};

export { storeItems };

export const Store = () => {
  const navigate = useNavigate();

  // Add scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [rewards, setRewards] = useState(() => {
    try {
      const saved = localStorage.getItem("rewards");
      return saved ? JSON.parse(saved) : { points: 0 };
    } catch (error) {
      console.error("Error loading rewards:", error);
      return { points: 0 };
    }
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Themes",
    "Features",
    "Customization",
    "Premium",
    "Physical",
    "Digital",
    "Experiences",
  ];

  const filteredItems = () => {
    let items = [];
    if (selectedCategory === "All") {
      Object.values(storeItems).forEach((categoryItems) => {
        items = [...items, ...categoryItems];
      });
    } else {
      items = storeItems[selectedCategory.toLowerCase()] || [];
    }

    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  };

  const handlePurchase = (item) => {
    if (rewards.points >= item.points) {
      // Handle purchase logic here
      setRewards((prev) => ({
        ...prev,
        points: prev.points - item.points,
      }));
      // Add to purchased items
      const purchased = JSON.parse(
        localStorage.getItem("purchasedItems") || "[]"
      );
      purchased.push({
        ...item,
        purchaseDate: new Date().toISOString(),
      });
      localStorage.setItem("purchasedItems", JSON.stringify(purchased));
      // Show success message
      alert(`Successfully purchased ${item.name}!`);
    } else {
      alert("Not enough points!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Store Header */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                Reward Store
              </h1>
              <p className="text-gray-600 mt-1 line-clamp-2">
                Redeem your points for amazing rewards!
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-star text-indigo-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-indigo-600 truncate">
                    {rewards.points || 0}
                  </div>
                  <div className="text-xs font-medium text-indigo-500 truncate">
                    Available Points
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Categories */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search rewards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Store Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems().map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 rounded-lg p-4 mb-3`}
                >
                  <i
                    className={`fas ${item.icon} text-3xl text-${item.color}-500`}
                  ></i>
                </div>
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-bold">
                    {item.points} points
                  </span>
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={rewards.points < item.points}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      rewards.points >= item.points
                        ? "bg-indigo-500 text-white hover:bg-indigo-600"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    } transition-colors`}
                  >
                    {rewards.points >= item.points
                      ? "Purchase"
                      : "Not enough points"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
