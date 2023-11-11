// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { Router } from '@angular/router';

// declare var JitsiMeetExternalAPI: any;

// @Component({
//   selector: 'app-jitsi',
//   templateUrl: './jitsi.component.html',
//   styleUrls: ['./jitsi.component.css']
// })
// export class JitsiComponent implements OnInit, AfterViewInit {

//   domin: string = 'meet.jit.si';
//   room: any;
//   user: any;
//   api: any;
//   options: any;


//   isAudioMuted = false;
//   isVideoMuted = false;


//   constructor(
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.room = 'jitsiMeetingAPIExample';
//     this.user = {
//       name: ' Coding Wall'
//     }
//   }

//   ngAfterViewInit(): void {

//     this.options = {
//       roomName: this.room,
//       width: 900,
//       height: 500,
//       configOverWrite: {
//         proJoinPageEnable: false
//       },
//       interfaceConfigOverWrite: {
//         TILE_VIEW_MAX_COLUMNS: 8
//       },
//       parentNode: document.querySelector('#jist-iframe'),
//       userInfo: {
//         displayName: this.user.name
//       }
//     }

//     this.api = new JitsiMeetExternalAPI(this.domin, this.options);

//     this.api.addEventListeners({
//       readyToClose: this.handleClose,
//       participantLeft: this.handleParticipantLeft,
//       participantJoined: this.handleParticipantJoined,
//       videoConferenceJoined: this.handleVideoConferenceJoined,
//       audioMuteStatusChanged: this.handleMuteStatus,
//       videoMuteStatusChanged: this.handleVideoStatus,


//     })

//   }


//   handleClose = () => {

//   }


//   handleParticipantLeft = async (participant: any) => {

//     const data = await this.getParticipants();


//   }
//   handleParticipantJoined = async (participant: any) => {

//     const data = await this.getParticipants();


//   }


//   handleVideoConferenceJoined = async (participant: any) => {
//     const data = await this.getParticipants();


//   }
//   handleVideoConferenceLeft = () => {
//     this.router.navigate(['/']);

//   }

//   handleMuteStatus = (audio : any) => {

//   }

//   handleVideoStatus = (video : any) => {

//   }

//   getParticipants() {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(this.api.getParticipantsInfo())
//       }, 500)
//     })
//   }

//   executeCommand(command : string) {

//     this.api.executeCommand(command);

//     if(command == 'hangup') {
//       this.router.navigate(['/']);
//     }

//     if(command == 'toggleAudio') {
//       this.isAudioMuted = !this.isAudioMuted;
//     }

//     if(command == 'toggleVideo') {
//       this.isVideoMuted = !this.isVideoMuted;
//     }

//   }

// }
