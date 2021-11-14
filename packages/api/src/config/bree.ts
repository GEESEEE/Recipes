import path from 'path'
import Bree from 'bree'

console.log('Bree Config')

const bree = new Bree({
    root: path.join(__dirname, '../jobs'),
    jobs: [
        {
            name: 'orphan-ingredients',
            interval: '10s',
        },
    ],
})

bree.start()
