import path from 'path'
import Bree from 'bree'

const bree = new Bree({
    root: path.join(__dirname, '../jobs'),
    jobs: [
        {
            name: 'orphan-ingredients',
            interval: 'at 3:00 am',
        },
        {
            name: 'orphan-recipes',
            interval: 'at 3:00 am',
        },
    ],
})

bree.start()
