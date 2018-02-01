myApp.service('TemplateService', function () {
    this.title = "Home";
    this.meta = "";
    this.metadesc = "";

    var d = new Date();
    this.year = d.getFullYear();

    this.init = function () {
        this.header = "views/template/header.html";
        this.menu = "views/template/menu.html";
        this.content = "views/content/content.html";
        this.footer = "views/template/footer.html";
    };

    this.getHTML = function (page) {
        this.init();
        var data = this;
        data.content = "views/" + page;
        return data;
    };

    // SCROLL TO FUNCTION
    this.scrollTo = function (destination, type) {
      if (type == 'id') {
        var destination = '#' + destination;
      } else if (type == 'class') {
        var destination = '.' + destination;
      }
      // console.log(destination, type, 'in dir')
      $('html,body').animate({
        scrollTop: $(destination).offset().top
      },
        'slow');
    };
    // SCROLL TO FUNCTION END

    this.init();

});