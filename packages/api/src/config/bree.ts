import path from 'path'
import Bree from 'bree'

const bree = new Bree({
    root: path.join(__dirname, '../jobs'),
    jobs: [
        {
            name: 'orphan-ingredients',
            interval: '24h',
        },
    ],
})

bree.start()
