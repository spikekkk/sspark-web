// invoked in worker
think.app.on('appReady', function() {
  think.startEureka();
});

process.on('SIGTERM', function() {
  think.stopEureka({
    cb: () => {
      process.exit(0);
    }
  });
});

process.on('SIGINT', function() {
  think.stopEureka({
    cb: () => {
      process.exit(0);
    }
  });
});
