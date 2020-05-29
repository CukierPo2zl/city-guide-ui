import { Component, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/city';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { AttractionService } from 'src/app/services/attraction.service';
import { Attraction } from 'src/app/models/attraction';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  @Output()
  attractionsChange: EventEmitter<Attraction[]> = new EventEmitter<Attraction[]>();

  stateForm: FormGroup = this._formBuilder.group({
    city: '',
    category: ''
  });


  cities: City[] = [];
  filteredOptions: Observable<City[]>;

  categories: Category[] = [];
  extraValue: Category = {
    pk: null,
    name: null,
  };

  constructor(
    private cityService: CityService,
    private categoryService: CategoryService,
    private attractionService: AttractionService,
    // tslint:disable-next-line: variable-name
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    /** Load avaible cities to form */
    this.cityService.getCities().subscribe((res: City[]) => {
      this.cities = res;
    });
    /** Load avaible categories to form */
    this.categoryService.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
      /** Adds value which means 'get from all categoties' */
      this.categories.push(
        this.extraValue
      );
    });

    // tslint:disable-next-line: no-non-null-assertion
    this.filteredOptions = this.stateForm.get('city')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  onSubmit() {
    this.attractionService.getAttractions(this.stateForm.get('city').value, this.stateForm.get('category').value)
      .subscribe((res: Attraction[]) => {
        this.attractionsChange.emit(res);
      });

  }




}
