module.exports = function exit(args) {
  if (args.length === 0) {
    process.exitCode = 1;
    process.exit();
  }
};

