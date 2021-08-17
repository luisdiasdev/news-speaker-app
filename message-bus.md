# Message Bus

On Main Process:
                            ----------------------------|
                            |                           |
-> action -> dispatch -> reducer -> store (persistent)  |
                            |                           |
                            ------> middleware          |
                                        |               |
                        ipc/preload <----         ipc/preload
                            |                           |
On Renderer Process:        |                           |
                            |                           |
-> action -> dispatch -> reducer -> store (local)       |
                            |                           |
                            |                           |
                            |-----> middleware ---------|


To avoid infinite loop:
    action must have a meta attribute called 'source'
    this attribute can have one of the following values: 'renderer', 'main'