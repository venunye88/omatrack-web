import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { StationService } from 'app/services/station.service';
import { Observable } from 'rxjs';
import { Station } from 'app/models/station.model';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {
  filterText: string = "";
  showForm: boolean;
  stationForm: FormGroup;
  stations: Observable<Station[]>;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fb: FormBuilder, private stationService: StationService) { }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchStations();
  }
  fetchStations() {
    this.stations = this.stationService.get();
  }

  openForm(station?: Station) {
    this.stationForm.reset();
    this.showForm = true
    if (station != null) { this.stationForm.patchValue(station); }
  }

  closeForm() { this.showForm = false; }

  async save(station: Station) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.stationService.save(station);
      if (res) {
        this.closeForm();
        this.fetchStations();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  async delete(station: Station) {
    let confirm = await MessageBox.confirm("Delete User", `Are you sure you want to delete ${station.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.stationService.delete(station.id);
      if (res) {
        this.closeForm();
        this.fetchStations();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.stationForm = this.fb.group({
      id: 0,
      name: '',
      phoneNumber: '',
      address: '',
      email: '',
      location: '',
      description: '',
      latitude: null,
      longitude: null
    })
  }

}
