  <div className="flex items-center gap-2">
    <span className="text-2xl font-bold text-gray-900">
      {tracker.currentProgress}
    </span>
    {tracker.unit && (
      <span className="text-sm text-gray-500">{tracker.unit}</span>
    )}
  </div>
  <div className="flex items-center gap-2">
    <span className="text-2xl font-bold text-gray-900">
      {tracker.dailyGoal}
    </span>
    {tracker.unit && (
      <span className="text-sm text-gray-500">{tracker.unit}</span>
    )}
  </div> 