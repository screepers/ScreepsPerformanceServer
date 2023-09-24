# Private server commands

## Spawn energy

`storage.db['rooms.objects'].update({ type: 'spawn' },{ $set: { store: {energy:1000} }})`

## Source energy

`storage.db['rooms.objects'].update({ type: 'source' },{ $set: { store: {energy:5000} }})`

## Controller level

`storage.db['rooms.objects'].update({ _id: 'cdbf0773313f0a9' },{ $set: { level: 8 }})`

## Construction progress

`storage.db['rooms.objects'].update({ type: 'constructionSite' },{ $set: { progress: 99999 }})`

## User cpu

`storage.db['users'].update({ },{ $set: { cpu: 500 }})`
