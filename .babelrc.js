const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTest ? 'auto' : false }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
