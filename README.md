# IPSUM.IR

The code powering [ipsum.ir](http://ipsum.ir), a categorized ipsum generator with REST API for those who care.

## REST API

The grammer of our API is as follows:

     http://ipsum.ir/:category/:unit/:amount

#### Categories

Available categories: news, design and normal

We're planning to add more categories soon, feel free to add a category!

#### Units

Currently, units are paragraph as `p`, word as `w` and character as `c`. Please note, character doesn't include spaces.

Examples:

    http://ipsum.ir/design/p/2
    http://ipsum.ir/normal/c/250
    http://ipsum.ir/news/w/10


## Contributing

Our dictionaries are simply an array of words, if you have a bunch of words (+35) in a category, you can add it yourself or contact me [mahdi@dibaiee.ir](mailto:mahdi@dibaiee.ir) and I'll add them.

Any contribution is appreciated, new ideas, bug reports, etc.
