import React from "react";

const CategoryDropdown = ({ setCategory }) => {
  const categories = [
    "Health & Fitness",
    "Learning & Education",
    "Personal Development",
    "Career & Work",
    "Finance & Money",
    "Relationships",
    "Hobbies & Interests",
    "Home & Living",
    "Travel & Adventure",
    "Spirituality & Mindfulness",
    "Social & Community",
    "Technology & Digital",
    "Creativity & Arts",
    "Environment & Sustainability",
    "Other",
  ];

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="w-full">
      <select
        onChange={handleChange}
        className="w-full h-10 px-4 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 text-gray-700"
        defaultValue=""
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
