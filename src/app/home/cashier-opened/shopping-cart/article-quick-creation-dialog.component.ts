import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {ArticleQuickCreation} from './article-quick-creation.model';
import {ShoppingCartService} from './shopping-cart.service';

@Component({
  templateUrl: 'article-quick-creation-dialog.component.html',
  styleUrls: ['shopping-cart.component.css']
})
export class ArticleQuickCreationDialogComponent {

  article: ArticleQuickCreation;

  constructor(private shoppingCartService: ShoppingCartService, private dialogRef: MatDialogRef<ArticleQuickCreationDialogComponent>) {
  }

  invalidArticle(): boolean {
    return !this.article.description || !this.article.retailPrice;
  }

  create() {
    this.shoppingCartService.createArticle(this.article).subscribe(
      () => this.dialogRef.close(true)
    );
  }
}
