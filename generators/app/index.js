'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({

  initializing: function () {
    this.log(yosay('\'Allo \'Allo! Let\'s spruce up your Cordova App\'s www directory.'));
  },

  prompting: function () {
    var prompts = [{
      type: 'input',
      name: 'title',
      message: 'App Title for navbar',
      default: this.appname
    }, {
      type: 'list',
      name: 'js',
      message: 'JavaScript Flavor',
      choices: ['jQuery', 'Framework7 - iOS', 'Framework7 - Android', 'Vanilla'],
      default: 0
    }];
    var done = this.async();

    this.prompt(prompts, function (answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },

  writing: {

    js: function () {
      switch (this.answers.js) {
      case 'jQuery':
        this.directory('jquery/www', 'www');
        this.fs.copyTpl(
          this.templatePath('jquery/index.html'),
          this.destinationPath('www/index.html'),
          this.answers
        );
        break;

      case 'Framework7 - iOS':
        this.directory('framework7-ios/www', 'www');
        this.fs.copyTpl(
          this.templatePath('framework7-ios/index.html'),
          this.destinationPath('www/index.html'),
          this.answers
        );
        break;

      case 'Framework7 - Android':
        this.directory('framework7-android/www', 'www');
        this.fs.copyTpl(
          this.templatePath('framework7-android/index.html'),
          this.destinationPath('www/index.html'),
          this.answers
        );
        break;

      case 'Vanilla':
        this.directory('vanilla/www', 'www');
        this.fs.copyTpl(
          this.templatePath('vanilla/index.html'),
          this.destinationPath('www/index.html'),
          this.answers
        );
        break;
      }
    }
  },

  end: function () {
    this.log(yosay('Very well, that should do it. Cheerio!'));
  }

});
