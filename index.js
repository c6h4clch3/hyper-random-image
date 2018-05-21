'use strict';
/**
 * 特定ディレクトリ以下のファイルを背景画像として利用する
 */
/*global __dirname*/
const fs = require('fs');
const path = require('path');
const process = require('process');

const userHome =
  process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

function resolvePath(path) {
  return path.replace(/\$\{HOME\}/, userHome);
}

function getTargetDir(dir) {
  return dir ? resolvePath(dir) : resolvePath('${HOME}/.hyper_images');
}

function getFileNames(dir) {
  let targetDir = getTargetDir(dir);

  let files = [];
  try {
    files = fs.readdirSync(targetDir);
  } catch (_) {
    targetDir = path(__dirname);
    files = fs.readdirSync(targetDir);
  }
  return files.map(file => targetDir + '/' + file).filter(file => {
    return (
      fs.statSync(file).isFile() && /.*(\.jpeg|\.jpg|\.png|\.gif)$/.test(file)
    );
  });
}

function determineFile(fileList) {
  if (!fileList || fileList.length === 0) {
    return '';
  }

  const length = fileList.length;
  const index = Math.floor(Math.random() * length);

  return fileList[index];
}

exports.decorateConfig = config => {
  const fileList = getFileNames();
  const file = determineFile(fileList);
  return Object.assign({}, config, {
    css: `
    ${config.css || ''}
    .terms_terms:before {
      content: '';
      background-repeat: no-repeat;
      background-image: url('${file ? 'file://' + file : ''}');
      background-size: cover;
      background-position: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    `
  });
};
