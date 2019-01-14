import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: any = {};
  categories$;
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
    this.categories$ = categoryService.getCategories();

     this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product: any) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('are you sur?')) return;
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']); 
  }

}
