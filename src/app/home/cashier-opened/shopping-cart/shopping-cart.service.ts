import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '../../../core/http.service';
import {ApiEndpoint} from '../../shared/api-endpoint.model';
import {ArticleService} from '../../shared/article.service';
import {Article} from '../../shared/article.model';
import {Shopping} from './shopping.model';
import {TicketCreation} from './ticket-creation.model';

import {ArticleQuickCreation} from './article-quick-creation.model';

@Injectable()
export class ShoppingCartService {

  static ARTICLE_VARIOUS = '1';
  static SHOPPING_CART_NUM = 4;

  private totalShoppingCart = 0;
  private shoppingCart: Array<Shopping> = [];
  private indexShoppingCart = 0;
  private shoppingCartList: Array<Array<Shopping>> = [];
  private shoppingCartSubject: Subject<Shopping[]> = new BehaviorSubject(undefined); // refresh auto
  private lastArticle: Article;

  constructor(private articleService: ArticleService, private httpService: HttpService) {
    for (let i = 0; i < ShoppingCartService.SHOPPING_CART_NUM; i++) {
      this.shoppingCartList.push([]);
    }
  }

  static isArticleVarious(code: string): boolean {
    return code === ShoppingCartService.ARTICLE_VARIOUS;
  }

  shoppingCartObservable(): Observable<Shopping[]> {
    return this.shoppingCartSubject.asObservable();
  }

  getIndexShoppingCart(): number {
    return this.indexShoppingCart + 1;
  }

  getTotalShoppingCart() {
    return this.totalShoppingCart;
  }

  getLastArticle(): Article {
    return this.lastArticle;
  }

  synchronizeCartTotal(): void {
    let total = 0;
    for (const shopping of this.shoppingCart) {
      total = total + shopping.total;
    }
    this.totalShoppingCart = Math.round(total * 100) / 100;
  }

  getTotalCommitted(): number {
    let total = 0;
    for (const shopping of this.shoppingCart) {
      if (shopping.committed) {
        total += shopping.total;
      }
    }
    return Math.round(total * 100) / 100;
  }

  uncommitArticlesExist(): boolean {
    for (const shopping of this.shoppingCart) {
      if (!shopping.committed && shopping.amount > 0) {
        return true;
      }
    }
    return false;
  }

  delete(shopping: Shopping): void {
    const index = this.shoppingCart.indexOf(shopping);
    if (index > -1) {
      this.shoppingCart.splice(index, 1);
    }
    this.synchronizeAll();
  }

  add(code: string): Observable<any> {
    const price: number = Number(code.replace(',', '.'));
    if (!Number.isNaN(price) && code.length <= 5) {
      code = ShoppingCartService.ARTICLE_VARIOUS;
    }
    return this.articleService.readOne(code).pipe(
      map(
        (article: Article) => {
          const shopping = new Shopping(article.code, article.description, article.retailPrice);
          if (article.stock < 1) {
            shopping.committed = false;
          }
          if (ShoppingCartService.isArticleVarious(article.code)) {
            shopping.total = price;
            shopping.updateDiscount();
          }
          this.shoppingCart.push(shopping);
          this.lastArticle = article;
          this.synchronizeAll();
        })
    );
  }

  exchange(): void {
    this.shoppingCartList[this.indexShoppingCart++] = this.shoppingCart;
    this.indexShoppingCart %= ShoppingCartService.SHOPPING_CART_NUM;
    this.shoppingCart = this.shoppingCartList[this.indexShoppingCart];
    this.synchronizeAll();
  }

  createArticle(articleQuickCreation: ArticleQuickCreation): Observable<Article> {
    return this.httpService.successful().post(ApiEndpoint.ARTICLES, articleQuickCreation);
  }

  checkOut(ticketCreation: TicketCreation): Observable<any> {
    ticketCreation.shoppingCart = this.shoppingCart;
    return this.httpService.pdf().post(ApiEndpoint.TICKETS, ticketCreation).pipe(
      map(() => this.reset())
    );
  }

  isEmpty(): boolean {
    return (!this.shoppingCart || this.shoppingCart.length === 0);
  }

  private synchronizeAll() {
    this.shoppingCartSubject.next(this.shoppingCart);
    this.synchronizeCartTotal();
  }

  private reset() {
    this.shoppingCart = [];
    this.synchronizeAll();
  }

}
