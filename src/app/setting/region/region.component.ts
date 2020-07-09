import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from 'app/models/region.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RegionService } from 'app/services/region.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  regions: Observable<Region[]>;
  showForm: boolean;
  filterText: string = "";
  regionForm: FormGroup;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private regionService: RegionService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchRegions();
  }

  fetchRegions() {
    this.regions = this.regionService.get();
  }

  openForm(ag?: Region) {
    this.regionForm.reset();
    this.showForm = true;
    if (ag != null) {
      this.regionForm.patchValue(ag);
    }
  }

  closeForm() { this.showForm = false; }

  async save(region: Region) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.regionService.save(region);
      if (res) {
        this.closeForm();
        this.fetchRegions();
      }
    } catch (error) { } finally { this.loading.stop() };
  }

  async delete(region: Region) {
    let confirm = await MessageBox.confirm("Delete Region", `Are you sure you want to delete ${region.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.regionService.delete(region.id);
      if (res) {
        this.closeForm();
        this.fetchRegions();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.regionForm = this.fb.group({
      id: 0,
      name: '',
      description: ''
    })
  }


}
