module.exports = {
  selection: {
    range: {
      start: 0,
      end: 0
    }
  },
  body: [{
    type: 'p',
    runs: [{
      text: 'hello world',
      style: {
        backgroundColor: 'yellow'
      }
    }]
  }, {
    type: 'p',
    runs: [{
      text: 'winternote is ...',
      style: {
        color: 'white',
        backgroundColor: 'green'
      }
    }]
  }]
};
