import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero  implements OnInit, OnDestroy {

  constructor(
    private api: ApiService,
    private router: Router,


  ) { }

  slideInterval: any;

  services: any[] = [];

  currentIndex = 0;

  ngOnInit() {

    this.loadServices();

    const selectedId =
      localStorage.getItem(
        'selectedServiceId'
      );

    if (selectedId) {

      setTimeout(() => {

        const element =
          document.getElementById(
            'service-' + selectedId
          );

        if (element) {

          element.scrollIntoView({

            behavior: 'smooth'

          });

        }

        localStorage.removeItem(
          'selectedServiceId'
        );

      }, 1000);

    }

  }


  loadServices() {

    this.api
      .getService()
      .subscribe({

        next: (res: any) => {

          this.services =
            (res || [])
              .filter(
                (s: any) =>
                  s.imageUrl
              );

          this.currentIndex = 0;
          clearInterval(
            this.slideInterval
          );

          if (
            this.services.length > 1
          ) {

            this.startSlide();

          }

        },

        error: (err) => {

          console.log(err);

        }

      });

  }


  startSlide() {

    clearInterval(
      this.slideInterval
    );

    this.slideInterval =
      setInterval(() => {

        if (
          this.services.length > 1
        ) {

          this.currentIndex =
            (
              this.currentIndex + 1
            )
            %
            this.services.length;


        }

      }, 3000);

  }

  goToIndex(
    index: number
  ) {

    this.currentIndex =
      index;

    clearInterval(
      this.slideInterval
    );

    if (
      this.services.length > 1
    ) {

      this.startSlide();

    }

  }

  getTransform(
    index: number
  ) {

    const total =
      this.services.length || 1;

    let offset =
      index -
      this.currentIndex;

    if (
      offset >
      total / 2
    ) {
      offset -= total;
    }

    if (
      offset <
      -total / 2
    ) {
      offset += total;
    }

    const abs =
      Math.abs(
        offset
      );

    if (
      offset === 0
    ) {

      return {

        transform:
          `
translate(-50%,-50%)
translateX(0)
scale(1)
rotateY(0deg)
`,

        zIndex: 999,

        opacity: 1

      };

    }

    return {

      transform:
        `
translate(-50%,-50%)
translateX(${offset * 220}px)
translateY(${abs * 25}px)
rotateY(${-offset * 18}deg)
scale(${1 - (abs * .12)})
`,

      zIndex:
        100 - abs,

      opacity:
        1 - (abs * .15)

    };

  }

  bookService(
    id: number
  ) {

    this.router.navigate(
      ['/service', id]
    );

  }

  ngOnDestroy() {

    clearInterval(
      this.slideInterval
    );

  }
}
