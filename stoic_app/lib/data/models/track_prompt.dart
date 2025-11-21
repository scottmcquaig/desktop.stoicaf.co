/// Model for track prompt data
class TrackPrompt {
  final int day;
  final String title;
  final String prompt;
  final String promptType;
  final String focusArea;

  const TrackPrompt({
    required this.day,
    required this.title,
    required this.prompt,
    required this.promptType,
    required this.focusArea,
  });

  factory TrackPrompt.fromJson(Map<String, dynamic> json) {
    return TrackPrompt(
      day: json['day'] as int,
      title: json['title'] as String,
      prompt: json['prompt'] as String,
      promptType: json['promptType'] as String,
      focusArea: json['focusArea'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'day': day,
      'title': title,
      'prompt': prompt,
      'promptType': promptType,
      'focusArea': focusArea,
    };
  }
}

/// Model for track data
class Track {
  final String trackId;
  final String trackName;
  final int duration;
  final String pillar;
  final List<TrackPrompt> days;

  const Track({
    required this.trackId,
    required this.trackName,
    required this.duration,
    required this.pillar,
    required this.days,
  });

  factory Track.fromJson(Map<String, dynamic> json) {
    return Track(
      trackId: json['trackId'] as String,
      trackName: json['trackName'] as String,
      duration: json['duration'] as int,
      pillar: json['pillar'] as String,
      days: (json['days'] as List)
          .map((day) => TrackPrompt.fromJson(day as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'trackId': trackId,
      'trackName': trackName,
      'duration': duration,
      'pillar': pillar,
      'days': days.map((day) => day.toJson()).toList(),
    };
  }
}
