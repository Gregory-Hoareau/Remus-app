import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Track } from 'src/app/models/track.model';
import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Component({
  selector: 'app-music-importer',
  templateUrl: './music-importer.page.html',
  styleUrls: ['./music-importer.page.scss'],
})
export class MusicImporterPage implements OnInit {

  private soundTimeLimit: number = 60; // Max length allow of a sound in second
  private musicsImported: Track[] = []
  phoneTracks: Track[] = []
  private player: MediaObject = null;
  currentTrack: Track = null;

  @Input()
  already_imported: Track[];

  @Input()
  background: boolean;

  constructor(private modalController: ModalController, private file:File, private media: Media) {}

  ngOnInit() {
    this.file.listDir(this.file.externalRootDirectory, 'Music').then(files => {
      files.forEach(f => {
        this.getMediaDuration(f.nativeURL).then(time => {
          if((this.background && time >= this.soundTimeLimit) 
              || (!this.background && time < this.soundTimeLimit)) {
            this.phoneTracks.push({
              name: f.name.split('.')[0],
              path: f.nativeURL
            });
          }
        }); // end then
      });
    });
    this.musicsImported = this.already_imported;
  }

  private getMediaDuration(path): Promise<number> {
    return new Promise((resolve, reject)=> {
      const audio = this.media.create(path);
      audio.seekTo(1);
      audio.onStatusUpdate.subscribe(status => {
        setTimeout(() => {
          resolve(audio.getDuration());
          audio.release();
        }, 500);
      })
    });
  }
  
  closeModal() {
    this.modalController.dismiss();
  }

  play(track: Track) {
    if(this.player) {
      this.stop()
    }
    this.player = this.media.create(track.path);
    this.player.onStatusUpdate.subscribe(status=> {
      if(status === this.media.MEDIA_STOPPED) {  
        this.player.release();
        this.player = null;
        this.currentTrack = null;
      }
    })
    this.player.play();
    this.currentTrack = track;
  }

  stop() {
    this.player.stop();
  }

  isSelected(track: Track) {
    for(const t of this.musicsImported) {
      if(t.name === track.name && t.path === track.path) {
        return true;
      }
    }
    return false;
  }

  select(track: Track) {
    this.musicsImported.push(track);
  }

  unselect(track: Track) {
    this.musicsImported.splice(this.musicsImported.indexOf(track),1)
  }

  import() {
    this.modalController.dismiss(this.musicsImported);
  }

}
