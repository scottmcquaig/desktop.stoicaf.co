import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/track_prompt.dart';

/// Mock service for loading track prompts from assets
/// Simulates async data loading without Firebase
class MockPromptService {
  /// Get a specific track by ID
  Future<Track> getTrack(String trackId) async {
    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 500));

    final jsonString = await rootBundle.loadString(
      'assets/prompts/tracks/${trackId.toLowerCase()}.json',
    );

    final jsonData = jsonDecode(jsonString) as Map<String, dynamic>;
    return Track.fromJson(jsonData);
  }

  /// Get a specific day's prompt from a track
  Future<TrackPrompt> getTrackPrompt(String trackId, int day) async {
    final track = await getTrack(trackId);

    // Find the prompt for the specified day
    final prompt = track.days.firstWhere(
      (p) => p.day == day,
      orElse: () => throw Exception('Prompt for day $day not found in track $trackId'),
    );

    return prompt;
  }

  /// Get all prompts for a track
  Future<List<TrackPrompt>> getAllTrackPrompts(String trackId) async {
    final track = await getTrack(trackId);
    return track.days;
  }

  /// Get all available tracks
  Future<List<Track>> getAllTracks() async {
    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 500));

    final trackIds = ['money', 'ego', 'relationships', 'discipline'];
    final tracks = <Track>[];

    for (final trackId in trackIds) {
      try {
        final track = await getTrack(trackId);
        tracks.add(track);
      } catch (e) {
        // Skip tracks that don't exist
        continue;
      }
    }

    return tracks;
  }
}
