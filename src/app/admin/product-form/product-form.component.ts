import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product;
  categories$;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
    this.categories$ = categoryService.getCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.get(id).pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
