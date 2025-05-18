import React, { useState, useRef, useEffect } from "react";

const IconDropdown = ({ icon, setIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(icon);
  const dropdownRef = useRef(null);

  // Sample of free FontAwesome icon names
  const iconNames = [
    "address-book",
    "address-card",
    "ambulance",
    "anchor",
    "angel",
    "apple-alt",
    "award",
    "battery-empty",
    "battery-full",
    "battery-half",
    "battery-quarter",
    "battery-empty",
    "bell",
    "bike",
    "birthday-cake",
    "book",
    "book-open",
    "bolt",
    "bookmark",
    "bug",
    "calendar",
    "camera",
    "camera-alt",
    "camera-retro",
    "car",
    "car-battery",
    "check-circle",
    "check-square",
    "chevron-down",
    "chevron-left",
    "chevron-right",
    "chevron-up",
    "circle",
    "circle-notch",
    "clock",
    "cloud",
    "cloud-meatball",
    "cloud-rain",
    "cloud-showers-heavy",
    "cloud-sun",
    "cloud-sun-rain",
    "comment-alt",
    "comment-dots",
    "comments",
    "cogs",
    "cogs",
    "coffee",
    "compass",
    "compress",
    "compress-alt",
    "copy",
    "copyright",
    "couch",
    "credit-card",
    "crop-alt",
    "desktop",
    "dentist",
    "directions",
    "disease",
    "dog",
    "download",
    "edit",
    "exclamation-circle",
    "expand",
    "expand-arrows-alt",
    "external-link-alt",
    "exclamation",
    "file",
    "file-alt",
    "file-excel",
    "file-image",
    "file-pdf",
    "file-powerpoint",
    "file-word",
    "file-archive",
    "folder",
    "folder-open",
    "frown",
    "frown-open",
    "gift",
    "glasses",
    "globe",
    "guitar",
    "hamburger",
    "hands-helping",
    "hand-holding",
    "hand-holding-medical",
    "hand-point-down",
    "hand-point-left",
    "hand-point-right",
    "hand-point-up",
    "hand-rock",
    "hand-peace",
    "hand-scissors",
    "hand-spock",
    "hashtag",
    "heartbeat",
    "home",
    "hotel",
    "image",
    "images",
    "inbox",
    "info-circle",
    "italic",
    "key",
    "keyboard",
    "laptop",
    "leaf",
    "luggage-cart",
    "map-marker-alt",
    "meh",
    "meh-blank",
    "meh-rolling-eyes",
    "microphone",
    "mobile-alt",
    "money-bill",
    "moon",
    "mug-hot",
    "music",
    "paper-plane",
    "palette",
    "pause",
    "pencil-alt",
    "phone-alt",
    "play",
    "plus",
    "plus-circle",
    "question-circle",
    "quote-left",
    "quote-right",
    "recycle",
    "redo",
    "recycle",
    "redo-alt",
    "reply",
    "reply-all",
    "rocket",
    "running",
    "save",
    "search",
    "seedling",
    "share-alt",
    "shopping-bag",
    "shopping-cart",
    "smile",
    "smile-beam",
    "smile-wink",
    "snowflake",
    "sort",
    "sort-alpha-down",
    "sort-alpha-up",
    "sort-numeric-down",
    "sort-numeric-up",
    "sort-amount-down",
    "sort-amount-up",
    "star",
    "star-half-alt",
    "street-view",
    "subscript",
    "sun",
    "sun-cloud",
    "sync-alt",
    "tablet-alt",
    "thumbs-down",
    "thumbs-up",
    "times",
    "times-circle",
    "trash-alt",
    "trophy",
    "truck",
    "umbrella",
    "user",
    "user-alt",
    "user-check",
    "user-circle",
    "user-friends",
    "user-graduate",
    "user-lock",
    "user-md",
    "user-plus",
    "user-secret",
    "users",
    "users-cog",
    "video",
    "video-camera",
    "volume-down",
    "volume-mute",
    "volume-off",
    "volume-up",
    "wallet",
    "wifi",
    "wind",
    "window-close",
    "window-maximize",
    "window-minimize",
    "window-restore",
    "wrench",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName);
    setIcon(iconName);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 aspect-square flex items-center justify-center rounded-lg bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-200 transition duration-200"
      >
        <i className={`fas fa-${selectedIcon} text-xl`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          <div className="grid grid-cols-4 gap-2 p-2">
            {iconNames.map((iconName) => (
              <button
                key={iconName}
                onClick={() => handleIconSelect(iconName)}
                className={`p-2 rounded-lg hover:bg-indigo-50 transition duration-200 ${
                  selectedIcon === iconName
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-600"
                }`}
              >
                <i className={`fas fa-${iconName}`}></i>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconDropdown;
