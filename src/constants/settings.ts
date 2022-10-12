import { ISettings } from '~/interfaces';
import { app } from 'electron';

export const DEFAULT_SEARCH_ENGINES = [
    {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q=%s',
        keywordsUrl: '',
        keyword: 'duckduckgo.com',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACT1BMVEUAAAD/gFXfWjbeWTPfWDTeWDTeWDPfYDXfWDPeWTT/bUngWDPfWTPfWDPjWTfeWTTjWzPeWTTeWDPkelzrnojvr53ywLLibEvxuKj77en66OPyvq/urJrrm4XgYj/ws6P88/HvsqHjdFbfYT/jclP65uHywrThaUjmgmf88e/rmoTlfmLxuKnxvK7tpZLibk/mhWruqZf88e7////3187haEfpk3v43NX88u/rmoPgZELywbPgY0H1zsP88/DmgWX43NT87+zgZ0XvsaDoj3bf5e7Gz+D2+PvW3em2wtjks6nwt6fN1eT9+ffgZUP0yr/5+vzv8vehsM3H0OHrnonywLNkfaxRbqL3+ftVcaSKncDxuqvurZuntdB+k7r+/v/eWjPmdinumx3wnxvlcyrojXT//vb/99P/87z2v1r0rRb8ywz90gr6xQ7ha0v//vj+5nP90w/90Qr1shXpgyXeWzP+42X90AvxphnzqRjypxnsjSLhZi/+42T3uRLuq5n//O/2uyL0rxbriSLsjiHwoRr7yg3iaC7niW/icFHiZy7zrBf5whD3uhLumR3jdlf66uXqlH3zxrrYXDTdWTPso4/d8da136bq9uX99fPeXDjcWTSkhzxquEa4dznlf2PB5LRlvEZmvUeHyXNuvlVouUh7qkKohTzmg2ffXjv+/fzG5rpas0ZkvEajiDz54NrQ68dftU1atEZit06npl+ApUKrgjvzx7vp9uV3xFy24Kj4/Pb55N/eWTXdeVfus6H77+v44Nr44Nn54tz76uYtKC1GAAAAEnRSTlMABkeVv9nzGJbxB4L0xy7jLfK6UobZAAACRklEQVQ4y4VT9XsTQRC9aKMEJsnFrb0kTbDSoUWKF5eixa24HO4Eihco7i6Lu7u35Q/jbu/2uLQfH/PTzs7bmdk3bzhOM4PRZLZYrRazyWjgOlqJzQ5en5/n/T4v2G0l7cIOpysQDIUj0VgsGgmHggGX01H03B1PJFOloFppKpkoc+uSdPII6UwWdJbNpAVPZ+29pzyXh67duvfo+ReSz5V71BwOt5CrAOhViYi9BQ1RkRPcSh/OeDovXVRVVfdB7NuvP0PE0nEnLeBK1Mj+gIFIbdBghsgkXHIRWyBJ+xuCqg0dxjpNBmwSf/ZgrewNxxEjR8nx0WPGshSpoN3AGSFE/z8Ox7MUE+oYHyEwciZvmDoTESdNpvEpU6tZirDXxJmnRei5HnH6jJkyYNbsOQwQ8Zk5iz9Kz3MR582nGRZgPSxsWLR4CUDUb+GsfIwClrIOli1fsXLValFc0yBRwVs1wFolvG79BlGyjZs2b5G54rtoJaCSAraK27bv2FnYpdzJJcw+pUlQiNwtNuqGKjfJvgl7KGDvPnF/4cDBQ41Nh9VvMqLgiNLE0ebCseNNJ042M6IkqlMUUKcATukqUKq1YcFpCjijkxUdljzuDPXPUoA8+nPn9eNmgoELePHSZbxy9dr1Gzep6NJlTr3k4BbeJnfu3rv/gJCHRZKTRPtIEi08fvKUkGeEPCfkRZFoFdnXZOHlK0Jev3n77j35UCx7dXFqP376/OUr4rfvP362Wxy2er9aWtvaWlt+d1y9/y/vv9f/DzYRmYvARwKBAAAAAElFTkSuQmCC',
    },
    {
        name: 'Google',
        url: 'https://www.google.com/search?q=%s',
        keywordsUrl: 'http://google.com/complete/search?client=chrome&q=%s',
        keyword: 'google.com',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACDVBMVEUAAAD+/v7+/v79/f39/f39/f39/f39/f3+/v7+/v79/f39/f39/f39/f3+/v7////9/f39/f39/f39/f3+/v7+/v79/f39/f3+/v7+/v79/f39/f3////+/v79/f3////9/f3+/v7+/v79/f39/f39/f3+/v7////9/f3+/v79/f39/f39/f3////9/f3////+/v7////85uT1pZ7wdGrsVUjqRjjqRTfsU0bvcmj1oZr85OL85+XxgXjqRDbqQzXxf3b3urXrSz7rTD/4v7r1p6DyioHuZVn0m5P3tK73ta/0m5TuZlryjob//v7rSj3tXFD5zMj5y8fsWEzzlIz0kG3vbGH+8vL+9fT+9t37uQfxdyD98O7934b7vAX1kxXrSTT3uLP8zUb5riH/+/v7whz801lChfS/1fv7vQf93H2lxfqfwfn80liqyPr8zkfkwi76/fve6v3B1/v934iztSE8qFCw3byox/rn8P7+9t/2vAmGsDM0qFNGsGLs9+/z9/5UkPVgmfaPx4JcuXXw+fL6/P93p/epyPrm9Oo+rFtMsmfC5cza7+BjsahChfH2+f634MJUtm6Nzp+q2rer27iV0qVkvHs1qFQ3oHdBiePD2Pyj2LE1pWA+jsq54cQ+rFw3qVab0rHn9et7xo82qVRnvn7X7t2h169swIJJsWU4qlZGsGNlvX3Y7t5rzgcKAAAAMXRSTlMADlqcy+367Fknn/f2nSUKjfz7iwkm1dIkMuvqMAuKD/UNV5nI+VYMmiOH09AI6CIvZ7+SkQAAAe5JREFUOMtjYIADRiZmFlY2NnYWZg5GBkzAycVtCAc8vHxo0vwCgoYoQEhYBFleVMwQA4hLIOQlpcBCRsYmpmbmFpZW1mCutAxcP1jextbOHgrsHGzAKqBmyILNd3SyRwLOLmBbIO4QALFd7VGBG9gWObD/QO53hAi7e3h6efsAGb5+EL+ALOECOc8fJB0QCHF/UHAIzCvMDAzyoPAJBcmHhcOEI+B+VVBkYAJSkVHR9vamMYZYgBIDM5CMjYuLT0jEJm+ozMACJJPi4uKSU7AqUGFgBZKpQAVpUJF0BMgABRYDG5DMBCrIwlSQDeSq4lOQA1bADrUiF1NBHtgKkCPzgQoKCpHdVgRSUAx2JMibJXFxpWXlyAoqQAoqwd7kAJJV1TW1tXX1CPmGRqB8E4ilxsDIA6Saa4GgpRUm39YOMqADFNTqDAy8QLqzC6Siuwci39vXD5RvnABkagBjk08IyJhYCwaTJk+ZOm36jNqZs9LTZwOF2TRBCUIYpGtOLQqYOw8UCIZakCSvDWLPX4CsYOEikJiOLiRRSkiDeIuXLIXLL1sOEtHThyVrGbAKw84VK1etXrhm7bR1YK6eASJjSIhjRrSOPnLWEpETQpVm09JFy50SzAoIaQUNTSz5W1FJWUVaVVVaRVlNHSEKACBb24XRQm7rAAAAAElFTkSuQmCC',
    },
    {
        name: 'Bing',
        url: 'https://www.bing.com/search?q=%s',
        keywordsUrl: '',
        keyword: 'bing.com',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAANlBMVEUAfX3k8/MAiop7trYAgoL6//8AdXULhIT///+exMQ4l5ew0dFLoaG929v0+/vQ5+eVwsIcjo4kKiufAAAAZElEQVQYlY2QyQ6AMAhEpy0Fuqr//7NWo108OQcSHsMSICJEMoSWR8sLQNCCD/A/AEALYFMy3+wFQdWkg0aLNaoaMM3gbQaV3eVww9HKajL60KbqmJ61QrvXBPQ7WrCRp0vXB5xZ6wZZjwmZbQAAAABJRU5ErkJggg==',
    },
    {
        name: 'Yahoo!',
        url: 'https://search.yahoo.com/search?p=%s',
        keywordsUrl: '',
        keyword: 'yahoo.com',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABnklEQVQokZWSPUyTYRSFn/t+rTX9EFp/SICwqIumMUwaJxdlYHAgBJwMCa5sLMaITizGARYSNTGROOAAokMHYggLBBIGCIHESBggwfJTQGgLL/3e61CxVWOa3ukO59xz7z1HOmWBSspUhAZCZREZdSfoGSQqprzCgQa945dHT5qef7mSVVdUCFQtapCICGBVAzSE1MUjibvngOSrrTDyixCoXm+P3u6Ipb7akcdbBlp6LzQ2nZ14nW7uugjsb+Qnh/fOSwiQTllQRZC3mgAeyWIO915vAA9l8Z0mgKEn68m+dEE8BIiQ0WD20+7N+/HWwUu5Hw6YGdu99zSmeeyh+9i3U316rRR8cKqx2nB/6lomHdicizeEu2X5zoua/e/5Dy+36ynsX/JWI7K2efxtJnP1lu/jrc5lE93Rtp56YH36eGUq550yim/1McPPNgr9WH9q6XPWHuj2ql2ZOjK/5/9lXN4qkE0HE0N7MbwH1fMGqvCkiC8hHKFdA41A8s2mjzEiNXj/Wiml4TtUZ3E+JiL/TcAfK1WJKRuWitP6EzoWnEvW4UekAAAAAElFTkSuQmCC',
    },
    {
        name: 'Ecosia',
        url: 'https://www.ecosia.org/search?q=%s',
        keywordsUrl: '',
        keyword: 'ecosia.org',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAylJREFUOI1Nk01sVFUYhp9z7r1zO1NK25ShtkxmSqE0VisWf0KbatkQ0USnEhPiwh+SGgkkLowQ6EKKWGgTNi4ICxtQMNFEMG1iMBqURKNMgtYwtKkUq20tFFoYxjudmc7ce+5xgdZ+2zfPu3m/R7Ds9P44oGOoYg9uoQ2IACaaG1jWMDJwDNNMiCODS4xYgg90gqFP4nk7/a1dyOZWCFffD527MDYMX5+CRecCwtr6X4lYgnEv6ujGLeKNwzjeON/+keTjiTBKCxrLVxBfH+Op2jD68+OIy0NTWKV14sgghu7uBJMPdHXjDrGnj/6fL1NMvc71tM25+QaigRlGnRzvX5tjau4W255/CSPtVIjZa+097U1nhD4Qh0VH03uexO2zdP+imSpGsKTHm2suEK89Q8EvI6dWEJJTmIEXWBs7idnzMixmn5Yo9yjtO/hLC1p/qCCjwqw0XJ4ovcGW8DdkvBqUH8IWPp6Oks0P8fdCAv+ZLvAKb0vcQhvNm/ny+gwNpkQIjRQeu+pPYwnNWKYJV5sAGMJDimrS6S/QjY+DKrZItFrtV0boqBxgQ/Aeed8iaqeIhS4hhKZ5ZRJLuBS1yW+ZjdhGDuVeRVeWAyIi0WitIWQoDj/4Hg+HZpnIV7MnOcBsPgZA0EzRO/4Wxye3c2pyF8l0C4YGwJdI4yZz09glLVhinptuGbZUjOVqmMnHsKXDuZmdjGZrcVSQT+ceQ5mPIu7eBpiWBEouyl+/Y1XVc7wz2o/jBZFoTOFTai6QV2Us+JqQ9JBocn6OhppnYeRHMAOJ+zPm04p3z8rTsw77hq8SswMoLVgXvIMpFFeyayiVLvOuxyt1EQ5tfgS644C5VuJrKK/az4l9vNpUz7FNDzFRcMn6HqPZKq4srEbrAr8XinSti3KorQX94UEwjU+QYvLfV34RDP8jQlWvsbufW8EKvhr/k5FUGuVrNlSUsW19HfW2RA/0IKaTCQi0ir7BZTJ1d4L291LI9PFkp2RTB6yqASnh3h0YuQTffwYloRN47BZHl8n0v87bQShwCwdRbgdaPQBCIEQKI/ATpr0XA0Tv0BLzDxefVnicNn0wAAAAAElFTkSuQmCC',
    },
    {
        name: 'Startpage',
        url: 'https://startpage.com/sp/search?q=%s&segment=startpage.skye',
        keywordsUrl: '',
        keyword: 'startpage.com',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQVQTFRFAAAAZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/ZXP/jpn/kpz/jJb/jZj/6+3/9/j//Pz+oaKxsLK+tbfCxsfQYWR9OT5dJClLISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJISZJVx0eowAAAFd0Uk5TAAVd0Pn3wlYEivr/+4Jbo1pcuv7sOc6nCQyxkgL4VUv5xQr3+lRN98AJxf+zCxDH/4kBWf3+rEhM0PA1CIf19uo5BUelxZnDJgIKCSfcvQZJ8pt0+PxSRzqmSAAAAJxJREFUeJxjYMACGJmYWVjZ2BlhfA5OLm4g4OHlgArwcbHyCwgKCYuIQgXEuMUlGBgkpbilZSACslxyIEpeQVEJIqCsogqi1NQ1NCECWto6ugwMevoGhkYQAWMTUzNzC0sDK2uooTa2VqZ29gYGDo4whzg5u+i7urmbuHrA3erp5W3k42vq54/ig4BAgyAUAc/gkFBUT/qbh2HxOgDmBhIEhh9kgAAAAABJRU5ErkJggg==',
    },
    {
        name: 'Qwant',
        url: 'https://www.qwant.com/?q=%s&t=web',
        keywordsUrl: '',
        keyword: 'qwant.com',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVxQTFRFAAAA+OkD+OkC8+cI1t4iv9c2rdFFnshX8+kF+OkC+OkD1N4knc1XlMpelMpejsqDgMrk9+kD+ekBzNstm8xel8til8til8tikspsiMyuf8znf8rk9+gF+ekC6OQSqdBVos1zscyPgLy/eL/of83of8zm+OkC+ekA4eIeosxzaqTrdLvrf8zohcbh9eAI+ekA8uQTa6PraabtfMjpfsvk2FtY8Ion6WI/b6XtZqDudrvrfsvnvh+W6zpF6j9KaqHrZZ/ucrbrf8nioQ3Lzip66jxI6UZSdKXqZ6DtZJ/ubrDqnAzOpBDHxyWI4ThZ6EFO50tU00d/rDK+a6HrZJ/uZaLrngzKoA3OqhLAuRyjth6qqhfBpBjNcaTqZqDtZJ/uY53snAzKnw3OoA3PoQ3QoRDPrDvQaqLsZJ7vY57uY5vpnwvFnQ7Ing7JoiHL36nscaToY53rYp7pYpvpzzuIDgAAAHR0Uk5TACt0oquKSQcHg/n////+xyiM+/u0a2GR7f/NHDn7+m8HATTX/pWM/64GWf/1DMf+ZBro/y/R/1YU3f81sP+BMPn9G2T/4ykIoP+8Etv/zEwUEAg//FU11v/+39WID8v+lyCU8f/lDmb/+iUHJSgVAwgrLAnytgcJAAAAp0lEQVR4nGNgwAoYmZhZWNnYYVwOTi5uHl4+Xn4BqICgkLCIqJi4hKSUNJgvIysnr8DAoKikrKIKFlBT19AEM7S0dXRBtJ6+AUSroZGxCYg2NTOHCFhYWlmDaBtbO4iAvYOjE4h2dnF1A9HuHp5eYAlvH18//4DAoOCQkFCI0rDwiMio6JjYuPgEqMsSk5JTUlLT0jMys2Cuz87JzcsvKCwqxu5XFAAAzsMa1I3bEfgAAAAASUVORK5CYII=',
    },
    {
        name: 'Swisscows',
        url: 'https://swisscows.com/web?query=%s',
        keywordsUrl: '',
        keyword: 'swisscows.com',
        icon: 'data:image/png;base64,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',
    },
    {
        name: 'Ekoru',
        url: 'https://www.ekoru.org/?ext=skye&q=%s',
        keywordsUrl: 'http://ac.ekoru.org/?ext=skye&q=%s',
        keyword: 'ekoru.org',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAABTVBMVEVHcEwGoc4fq68HodEirbQ/v78RmcxNsqIupbJOsVAZocIHntchqb0KoNgZqL0LoNk2r38HoNYaq71Ss0VVt1BZtEJUsj+fyjtuwGUXms8Poc0HnNMFpM8JotISoMgRn9UQn9EInNVdulhyuUIYqLMHp8p4vUAZo8mKxD4Gn9YNpcsGoNSMxj8Wq751uj8Fpdo0r3sFpNwsrotUtEiTyk1SsjtSskVQtWJItGmMxTyHxUgmsLAsqaI0q4kOmNQ9sG4yr4Jvu0krsakcpbRjuk6Dwz0KqMtBsm4Upr6AwkBCsW4NqMcurpM9sHaUyFhwvEdIsVSSylUwsKWizkqkzkBdt0lct0Iqrq5fuER/wT6Bwj8lrbNwwHC21UNPt4cPpMRIt49Zu38Up7szspglrKdEtHc8solGt5BavH5OuIB3xFqAxVMFp9hAsn9lv3FSuK/uAAAAaHRSTlMA/P6dPgQPCxUwIcYubZRWYLpdQthwTGn6GlGl9O6AOefX9SDzzpbvtqz54uCdRvjxyfuV2Thg9+166sJzeVmu3Mrw2tqi27Xz0W+p6aJdu4mYolKqrX+WyVqKgrEqx/bYvP///////rhNcOkAAAD4SURBVBiVJY9VQ8IAGAC/jSUrxpKUkO4uu7u7XQPq/3904r3dvR0AACGUKghSKQkkLFgS3612s9lG47HgwtPosKPSPfViw2D8QomoLFFhvpbE6HUjQAJXHqrsxPU8d4un9w8EaFm3wcnPuFiszs2adCJCw1HCXrWOQ3Z3hoZPy/Bl9+9nT+T1GZk9dI+PDD8oV/PHV+3mEs9Pc6FlaHx3nvURgNal8tM9P7TMB+xjPNK6L9S5mQttA2dk+tibrn+y9YwRWOUhwpgyTWAYQW+a8egKCxBNOLLSk+52HCRAEv4LziUsezCwLSQW+b/F15hUoZBKJ6k/+wXyrSm5N9MsrwAAAABJRU5ErkJggg==',
    },
];

export const DEFAULT_SETTINGS: ISettings = {
    theme: 'skye-light',
    darkContents: false,
    shield: true,
    multrin: true,
    animations: true,
    bookmarksBar: false,
    suggestions: true,
    themeAuto: true,
    searchEngines: DEFAULT_SEARCH_ENGINES,
    searchEngine: 0,
    startupBehavior: {
        type: 'empty',
    },
    tab: {
        image: 'https://file.coffee/u/y970mT9Cg5NkPg.png',
        topSites: true,
        pinned: true,
    },
    warnOnQuit: false,
    version: 2,
    downloadsDialog: false,
    downloadsPath: app
        ? app.getPath('downloads')
        : process.type !== 'browser' && process.type !== 'renderer'
            ? require('@electron/remote').app.getPath('downloads')
            : app
                ? app.getPath('downloads')
                : '',
    doNotTrack: false,
    globalPrivacyControl: true,
    topBarVariant: 'default',
    token: null,
};