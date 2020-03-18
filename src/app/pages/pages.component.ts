import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
declare var $: any;
@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.css"]
})
export class PagesComponent implements OnInit {
  constructor(private api: AuthenticationService, private router: Router) {}
  u: any;
  user = {
    username: ""
  };
  ngOnInit(): void {
    this.u = this.api.currentUserValue;
    this.user.username = this.u.username;
    this.init();
  }

  init() {
    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on("click", function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function() {
      if ($(window).width() < 768) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function(
      e
    ) {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });

    // Scroll to top button appear
    $(document).on("scroll", function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $(".scroll-to-top").fadeIn();
      } else {
        $(".scroll-to-top").fadeOut();
      }
    });

    // Smooth scrolling using jQuery easing
    $(document).on("click", "a.scroll-to-top", function(e) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top
          },
          1000,
          "easeInOutExpo"
        );
      e.preventDefault();
    });
  }

  logout() {
    this.api.logout();
    this.router.navigate(["/login"]);
  }
}
