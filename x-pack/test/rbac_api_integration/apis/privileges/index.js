/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import expect from 'expect.js';

export default function ({ getService }) {
  describe('privileges', () => {
    it(`get should return privileges`, async () => {
      const supertest = getService('supertest');

      await supertest
        .get(`/api/security/v1/privileges`)
        .expect(200)
        .then(resp => {
          expect(resp.body).to.eql([
            {
              application: 'kibana',
              name: 'all',
              actions: ['version:7.0.0-alpha1', 'action:*'],
              metadata: {},
            },
            {
              application: 'kibana',
              name: 'read',
              actions: [
                'version:7.0.0-alpha1',
                'action:login',
                'action:saved_objects/config/get',
                'action:saved_objects/config/bulk_get',
                'action:saved_objects/config/find',
                'action:saved_objects/timelion-sheet/get',
                'action:saved_objects/timelion-sheet/bulk_get',
                'action:saved_objects/timelion-sheet/find',
                'action:saved_objects/graph-workspace/get',
                'action:saved_objects/graph-workspace/bulk_get',
                'action:saved_objects/graph-workspace/find',
                'action:saved_objects/index-pattern/get',
                'action:saved_objects/index-pattern/bulk_get',
                'action:saved_objects/index-pattern/find',
                'action:saved_objects/visualization/get',
                'action:saved_objects/visualization/bulk_get',
                'action:saved_objects/visualization/find',
                'action:saved_objects/search/get',
                'action:saved_objects/search/bulk_get',
                'action:saved_objects/search/find',
                'action:saved_objects/dashboard/get',
                'action:saved_objects/dashboard/bulk_get',
                'action:saved_objects/dashboard/find',
                'action:saved_objects/url/get',
                'action:saved_objects/url/bulk_get',
                'action:saved_objects/url/find',
                'action:saved_objects/server/get',
                'action:saved_objects/server/bulk_get',
                'action:saved_objects/server/find',
              ],
              metadata: {},
            },
          ]);
        });
    });
  });
}
