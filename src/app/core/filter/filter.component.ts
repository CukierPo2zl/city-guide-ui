import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/city';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  myControl = new FormControl();


  cities: City[] = [];
  filteredOptions: Observable<City[]>;

  categories: Category[] = [];

  constructor(
    private cityService: CityService,
    private categoryService: CategoryService
    ){}

  ngOnInit() {
    this.cityService.getCities().subscribe((res: City[]) => {
      this.cities = res;
    });

    this.categoryService.getCategories().subscribe((res: Category[]) =>{
      this.categories = res;
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }






}
