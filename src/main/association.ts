/* eslint-disable import/prefer-default-export */
import { app } from 'electron';
import { Registry } from 'rage-edit';

export const makeAssociation = () => {
  if (!app.isPackaged) return;
  app.setAsDefaultProtocolClient('http');
  app.setAsDefaultProtocolClient('https');
  app.setAsDefaultProtocolClient('bytelab');

  if (process.platform === 'win32') {
    (async () => {
      await Registry.set(
        'HKCU\\Software\\ByteLab\\Capabilities',
        'ApplicationName',
        'ByteLab'
      );
      await Registry.set(
        'HKCU\\Software\\ByteLab\\Capabilities',
        'ApplicationDescription',
        'ByteLab'
      );

      await Registry.set(
        'HKCU\\Software\\BonBon\\Capabilities\\URLAssociations',
        'https',
        'ByteLab.https'
      );

      await Registry.set(
        'HKCU\\Software\\ByteLab\\Capabilities\\URLAssociations',
        'https',
        'ByteLab.http'
      );

      await Registry.set(
        'HKCU\\Software\\Classes\\ByteLab.https\\DefaultIcon',
        '',
        process.execPath
      );

      await Registry.set(
        'HKCU\\Software\\Classes\\BonBon.http\\DefaultIcon',
        '',
        process.execPath
      );

      await Registry.set(
        'HKCU\\Software\\Classes\\ByteLab.https\\shell\\open\\command',
        '',
        `"${process.execPath}" "%1"`
      );

      await Registry.set(
        'HKCU\\Software\\Classes\\ByteLab.http\\shell\\open\\command',
        '',
        `"${process.execPath}" "%1"`
      );

      await Registry.set(
        'HKCU\\Software\\RegisteredApplications',
        'ByteLab',
        'Software\\ByteLab\\Capabilities'
      );
    })();
  }
};
