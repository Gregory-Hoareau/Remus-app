import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, Platform } from '@ionic/angular';
import { MusicService } from 'src/app/providers/music/music.service';
import { Track } from 'src/app/models/track.model';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.page.html',
  styleUrls: ['./music-player.page.scss'],
})
export class MusicPlayerPage implements OnInit {

  @ViewChild('slides', {
    static: true
  }) private slider: IonSlides;

  slideNumber: number = 0;

  backgroundTracks: Track[] = [];
  phoneTracks: Track[] = [];
  soundTracks: Track[] = [];
  onAndroid: boolean = false;

  constructor(private modalCtrl: ModalController, private musicService: MusicService,
              private file: File, private plt: Platform) {
                
    this.plt.ready().then(val => {
      this.onAndroid = this.plt.is('android');
    })
  }

  ngOnInit() {
    console.log('On init');
    this.backgroundTracks = this.musicService.getBackgroungTracks();
    this.soundTracks = this.musicService.getSoundsTracks();
    this.file.listDir(this.file.externalRootDirectory, 'Music').then(files => {
      files.forEach(f => {
        this.phoneTracks.push({
          name: f.name.split('.')[0],
          path: f.fullPath
        });
      })
      this.musicService.setBackgroundPhoneTracks(this.phoneTracks)
    })
  }

  slideChanged() {
    this.slider.getActiveIndex().then(n => this.slideNumber = n);
  }

  segmentChanged(ev) {
    this.slider.slideTo(this.slideNumber);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Method of slide background music
  playBackground(track: Track) {
    this.musicService.launchBackground(track);
  }

  resume() {
    this.musicService.resume();
  }

  pause() {
    this.musicService.pause();
  }

  next() {
    this.musicService.next();
  }

  previous() {
    this.musicService.previous();
  }

  getCurrentTrack() {
    return this.musicService.getCurrentTrack();
  }

  isPlaying() {
    return this.musicService.isBackgroundMusicPlaying();
  }

  //Methods for soundbox slide
  playSound(sound: Track) {
    this.musicService.launchSound(sound);
  }

}
