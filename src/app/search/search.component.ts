import { ProductActions } from '../product/actions/product-actions';
import { AppState } from '../interfaces';
import { getTaxonomies, rootTaxonomyId, getBrands } from '../product/reducers/selectors';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Product } from '../core/models/product';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Taxonomy } from '../core/models/taxonomy';
import { Brand } from '../core/models/brand';
import { SearchActions } from './actions/search.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  taxonomies$: Observable<Taxonomy[]>;
  brands$: Observable<Array<Brand>>;
  products$: Observable<Array<Product>>;
  isBrandOpen = false;
  isCategoryOpen = true;
  screenwidth;
  isMobile;
  rootTaxonomyId: any;
  isModalShown = false;
  subscriptionList$: Array<Subscription> = [];

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;

  constructor(
    private store: Store<AppState>,
    private activatedRouter: ActivatedRoute,
    private actions: ProductActions,
    private searchActions: SearchActions,
    @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.screenwidth = window.innerWidth;
    }
    this.calculateInnerWidth();
    this.store.dispatch(this.actions.getAllTaxonomies());
    this.taxonomies$ = this.store.select(getTaxonomies);
    this.store.dispatch(this.actions.getBrands());
    this.brands$ = this.store.select(getBrands);

    this.subscriptionList$.push(
      this.store.select(rootTaxonomyId).subscribe(id => { this.rootTaxonomyId = id }),
      this.activatedRouter.queryParams.subscribe((params: Object) => { this.onUrlChange(params) })
    );
  }

  onUrlChange(urlParams: Object) {
  }

  showModal(): void {
    this.isModalShown = true;
  }

  calculateInnerWidth() {
    if (this.screenwidth <= 1000) {
      this.isMobile = this.screenwidth;
    }
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  OnCategeorySelected(category) {
  }
  showAll() {
  }

  isOpenChangeaccourdian() {
    this.isCategoryOpen = !this.isCategoryOpen;
  }

  ngOnDestroy() {
    this.subscriptionList$.forEach(sub$ => sub$.unsubscribe());
  }
}
