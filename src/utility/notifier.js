import humane from 'humane-js';

const notifier = humane.create({
  baseCls: 'humane-jackedup',
  timeout: 5000,
});
notifier.error = notifier.spawn({
  addnCls: 'humane-jackedup-error',
});
notifier.success = notifier.spawn({
  addnCls: 'humane-jackedup-success',
});

export default notifier;
