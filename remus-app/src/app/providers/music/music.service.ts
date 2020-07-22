import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Track } from 'src/app/models/track.model';
import { TRACKS, SOUNDS } from 'src/mocks/Track';
import { MusicControls } from '@ionic-native/music-controls/ngx';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  // Attributes link to background music
  private backgroundMusicTracks: Track[] = TRACKS;
  private backgroundMusicPlayer: Howl = null;
  private backgroundMusicIsPlaying: boolean = false;
  private backgroundCurrentTrack: Track = null;

  // Attributes link to sound playing
  private sounboxTracks: Track[] = SOUNDS;
  private soundPlayer: Howl = null;

  constructor(private musicControls: MusicControls) {
  }

  getSoundsTracks(): Track[] {
    return this.sounboxTracks;
  }

  getBackgroungTracks(): Track[] {
    return this.backgroundMusicTracks;
  }

  isBackgroundMusicPlaying() {
    return this.backgroundMusicIsPlaying;
  }

  getCurrentTrack() {
    return this.backgroundCurrentTrack;
  }

  initMusicControlNotif(song: Track) {
    this.musicControls.destroy();
    this.musicControls.create({
      track       : song.name,		// optional, default : ''
      isPlaying   : this.backgroundMusicIsPlaying,							// optional, default : true
      dismissable : true,							// optional, default : false

      hasPrev   : true,		// show previous button, optional, default: true
      hasNext   : true,		// show next button, optional, default: true
      hasClose  : true,		// show close button, optional, default: false

      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated
      ticker	  : 'Now playing "' + song.name + '"',
      //All icons default to their built-in android equivalents
      //The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
    })

    // Action on click on Notification buttons
    this.musicControls.subscribe().subscribe((action) => {
      const message = JSON.parse(action).message;
      switch(message) {
        case 'music-controls-next':
          console.log('Clicked on Next');
          this.next();
          break;
        case 'music-controls-previous':
          console.log('Clicked on Prev');
          this.previous();
          break;
        case 'music-controls-pause':
          this.pause();
          break;
        case 'music-controls-play':
          console.log('Clicked on Play');
          this.resume();
          break;
        case 'music-controls-destroy':
          console.log('Clicked on Destroy');
          this.backgroundMusicPlayer.stop();
          break;
    
        default:
          break;
      }
    });
    this.musicControls.listen();
  }

  // Background music methods
  launchBackground(track: Track) {
    if (this.backgroundMusicPlayer) {
      this.backgroundMusicPlayer.stop();
    }
    this.backgroundMusicPlayer = new Howl({
      src: [track.path],
      onload: () => {
        console.log('Background Track loaded');
        this.backgroundCurrentTrack = track;
        this.backgroundMusicPlayer.play();
      },
      onplay: () => {
        console.log('Background Track is playing');
        this.backgroundMusicIsPlaying = true;
        this.musicControls.updateIsPlaying(true);
      },
      onpause: () => {
        console.log('Background Track is on pause');
        this.backgroundMusicIsPlaying = false;
        this.musicControls.updateIsPlaying(false);
      },
      onstop: () => {
        console.log('Background Tack is stopped');
        this.backgroundMusicIsPlaying = false;
        this.musicControls.destroy();
        this.backgroundCurrentTrack = null;
      },
      onend: () => {
        console.log('Background Track has ended');
        this.backgroundMusicIsPlaying = false;
        this.musicControls.destroy();
        this.backgroundCurrentTrack = null;
      }
    });
    this.initMusicControlNotif(track);
  } // End launchBackground method

  resume() {
    this.backgroundMusicPlayer.play();
  }

  pause() {
    this.backgroundMusicPlayer.pause();
  }

  next() {
    const nextTrackIndex = (this.backgroundMusicTracks.indexOf(this.backgroundCurrentTrack) + 1) % this.backgroundMusicTracks.length;
    this.launchBackground(this.backgroundMusicTracks[nextTrackIndex]);
  }

  previous() {
    let prevTrackIndex = this.backgroundMusicTracks.indexOf(this.backgroundCurrentTrack) - 1;
    prevTrackIndex = prevTrackIndex < 0? this.backgroundMusicTracks.length -1 : prevTrackIndex;
    this.launchBackground(this.backgroundMusicTracks[prevTrackIndex]);
  }
  // End of Background music methods

  //Soundbox methods
  launchSound(sound: Track) {
    this.soundPlayer = new Howl({
      src: [sound.path],
      onload: () => {
        console.log('Sound is loaded');
        this.soundPlayer.play();
      },
      onplay: () => {
        console.log('Sound is playing');
      },
      onend: () => {
        console.log('Sound has ended');
      }
    });
  }
  //End of Soundbox methods
}
