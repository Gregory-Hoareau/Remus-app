import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Track } from 'src/app/models/track.model';
import { TRACKS, SOUNDS } from 'src/mocks/Track';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { MediaObject, Media } from '@ionic-native/media/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private prefix: string;

  // Attributes link to background music
  private backgroundMusicTracks: Track[] = TRACKS;
  private backgroundMusicIsPlaying: boolean = false;
  private backgroundCurrentTrack: Track = null;
  private backgroundCurrentMediaFile: MediaObject = null;
  private backgroundPhoneTracks: Track[] = [];

  // Attributes link to sound playing
  private soundboxTracks: Track[] = SOUNDS;
  private soundPhoneTracks: Track[] = [];

  constructor(private musicControls: MusicControls, private media: Media, private plt: Platform) {
    this.plt.ready().then(res => {
      if (this.plt.is('android')) {
        this.prefix = 'file:///android_asset/www/assets/music';
      }
    })
  }

  getSoundsTracks(): Track[] {
    return this.soundboxTracks;
  }

  getBackgroungTracks(): Track[] {
    return this.backgroundMusicTracks;
  }

  getBackgroundPhoneTracks(): Track[] {
    return this.backgroundPhoneTracks;
  }

  getSoundPhoneTracks(): Track[] {
    return this.soundPhoneTracks;
  }

  setBackgroundPhoneTracks(tracks: Track[]) {
    this.backgroundPhoneTracks = tracks;
  }

  setSoundPhoneTracks(tracks: Track[]) {
    this.soundPhoneTracks = tracks;
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
          this.stop();
          break;
    
        default:
          break;
      }
    });
    this.musicControls.listen();
  }

  // Background music methods
  launchBackground(track: Track) {
    if(this.backgroundCurrentTrack) {
      this.backgroundCurrentMediaFile.stop();
    }
    const path = this.backgroundMusicTracks.includes(track)? this.prefix + track.path: track.path
    this.backgroundCurrentMediaFile = this.media.create(path);

    //To delete
    console.log(this.backgroundCurrentMediaFile)
    this.backgroundCurrentMediaFile.onStatusUpdate.subscribe(status => console.log(status));
    this.backgroundCurrentMediaFile.onSuccess.subscribe(()=> console.log('Action is successful'));
    this.backgroundCurrentMediaFile.onError.subscribe(error => console.log('Error!', error));

    this.backgroundCurrentMediaFile.play();
    this.backgroundCurrentTrack = track;
    this.backgroundMusicIsPlaying = true;

    this.initMusicControlNotif(track);
    this.musicControls.updateIsPlaying(true);
   
  } // End launchBackground method

  stop() {
    this.backgroundCurrentMediaFile.stop();
    this.backgroundCurrentMediaFile.release();
    this.backgroundCurrentTrack = null;
    this.backgroundMusicIsPlaying = false;
  }

  resume() {
    this.backgroundCurrentMediaFile.play();
    this.backgroundMusicIsPlaying = true;
    this.musicControls.updateIsPlaying(true);
  }

  pause() {
    this.backgroundCurrentMediaFile.pause();
    this.backgroundMusicIsPlaying = false;
    this.musicControls.updateIsPlaying(false);
  }

  next() {
    const tracks = this.backgroundMusicTracks.includes(this.backgroundCurrentTrack)? this.backgroundMusicTracks: this.backgroundPhoneTracks;
    const nextTrackIndex = (tracks.indexOf(this.backgroundCurrentTrack) + 1) % tracks.length;
    this.launchBackground(tracks[nextTrackIndex]);
  }

  previous() {
    const tracks = this.backgroundMusicTracks.includes(this.backgroundCurrentTrack)? this.backgroundMusicTracks: this.backgroundPhoneTracks;
    let prevTrackIndex = tracks.indexOf(this.backgroundCurrentTrack) - 1;
    prevTrackIndex = prevTrackIndex < 0? tracks.length -1 : prevTrackIndex;
    this.launchBackground(tracks[prevTrackIndex]);
  }
  // End of Background music methods

  //Soundbox methods
  launchSound(sound: Track) {
    const path = this.soundboxTracks.includes(sound)? this.prefix + sound.path: sound.path
    const s = this.media.create(path);
    s.play();
  }
  //End of Soundbox methods
}
