import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FileIcons from "file-icons-js";
import * as React from "react";
import { FaFileO, FaFolderO } from "react-icons/lib/fa";
import "reflect-metadata";
import sinon, { SinonSandbox } from "sinon";

import { DirectoryItemIcon } from "components/blocks";
import { IDirectoryItem } from "models";

import applicationTheme from "settings/internal/themes/dark";

Enzyme.configure({ adapter: new Adapter() });

describe("<DirectoryItemIcon />", () => {
    let directoryItem: IDirectoryItem;

    let sandbox: SinonSandbox;

    beforeEach(() => {
        directoryItem = {
            name: "Some directory item",
            path: "/path/to/Some directory item",
            isDirectory: false,
            isHidden: false
        };

        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox && sandbox.restore();
    });

    it("renders an <FaFolderO /> when given a folder", () => {
        directoryItem.isDirectory = true;
        const component = <DirectoryItemIcon directoryItem={directoryItem} theme={applicationTheme} />;
        const wrapper = shallow(component);

        expect(wrapper.find(FaFolderO)).to.have.length(1);
    });

    it("renders an <FaFileO /> when file type unsresolvable", () => {
        sandbox.stub(FileIcons, "getClassWithColor").returns(null);
        const component = <DirectoryItemIcon directoryItem={directoryItem} theme={applicationTheme} />;
        const wrapper = shallow(component);

        expect(wrapper.find(FaFileO)).to.have.length(1);
    });

    it("renders an <i /> with retrieved className when file type resolvable", () => {
        const className = "some-class";
        sandbox.stub(FileIcons, "getClassWithColor").returns(className);
        const component = <DirectoryItemIcon directoryItem={directoryItem} theme={applicationTheme} />;
        const wrapper = shallow(component);

        expect(wrapper.findWhere(n => n.type() === "i" && n.hasClass(className))).to.have.length(1);
    });
});
