let _ScratchBlocks = null;

const isLoaded = () => !!_ScratchBlocks;

const get = () => {
    if (!isLoaded()) {
        throw new Error('scratch-blocks is not loaded yet');
    }
    return _ScratchBlocks;
};

const load = () => {
    if (_ScratchBlocks) {
        return Promise.resolve();
    }
    return import(/* webpackChunkName: "sb" */ 'scratch-blocks')
        .then(m => {
            _ScratchBlocks = m.default;
            // HubBlocks: wider block palette to fit the larger blocks (Scratch: 250)
            _ScratchBlocks.VerticalFlyout.prototype.DEFAULT_WIDTH = 320;
            _ScratchBlocks.Toolbox.prototype.width = 320 + 60;
            return _ScratchBlocks;
        });
};

export default {
    get,
    isLoaded,
    load
};
