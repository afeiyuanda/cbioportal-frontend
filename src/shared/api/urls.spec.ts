import { getGenomeNexusApiUrl } from './urls';
import React from 'react';
import { assert } from 'chai';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });
import AppConfig from 'appConfig';
import { IServerConfig } from 'config/IAppConfig';

describe('url library', () => {
    before(() => {
        //global.window = { location: { protocol: 'https://' } };
        AppConfig.serverConfig.genomenexus_url = 'http://www.test.com/hello/';
        AppConfig.apiRoot = 'http://www.cbioportal.org';
    });

    after(() => {
        delete (AppConfig.serverConfig as Partial<IServerConfig>)
            .genomenexus_url;
        delete AppConfig.apiRoot;
    });

    it('transforms genome nexus url configuration url to proxied url: removes protocol and trailing slash', () => {
        // note that this is WRONG (http: should be followed by double shlash)
        // but this is due to testing env and url builder library
        // this works correctly in browser env
        assert.equal(
            getGenomeNexusApiUrl(),
            'http://www.cbioportal.org/proxy/www.test.com/hello'
        );
    });

    it('transforms genome nexus url configuration url to proxied url: removes protocol and trailing slash', () => {
        AppConfig.serverConfig.genomenexus_url = null;
        // note that this is WRONG (http: should be followed by double shlash)
        // note that this is WRONG (http: should be followed by double shlash)
        // but this is due to testing env and url builder library
        // this works correctly in browser env
        assert.isUndefined(getGenomeNexusApiUrl());
    });
});
