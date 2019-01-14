module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "src/assets/scss/bootstrap/bootstrap";
          @import "src/assets/scss/bootstrap/bootstrap-grid";
          @import "src/assets/scss/bootstrap/bootstrap-reboot";
          @import "src/assets/scss/vars";
        `
      }
    }
  }
};