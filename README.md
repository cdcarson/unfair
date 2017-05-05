# Unfair

Looking at the fairness (or equality) of lists.

## Installation &amp; Usage
If you want to play along with the following discussion, do...


```sh
git clone git@github.com:cdcarson/unfair.git
cd unfair
npm install

# Get the raw variance of a list...
# node ./ variance [numbers...]
node ./ variance 1 2
Variance: 0.25

# Get the normalized (according to me) variance of a list...
# node ./ normalizedVariance [numbers...]
node ./ normalizedVariance 1 2
Normalized Variance: 0.1111111111111111

# Get the unfairness (according to me) of a list...
# node ./ unfair [numbers...]
node ./ unfair 1 2
Unfair: 0.3333333333333333
```

## Discussion

I've spent a bit of time thinking about the variance of a list. Let's say our test list is the populations of the 50 states:

```js
// the population of the 50 states...
4863300 741894 6931071 2988248 39250017 5540545 3576452 952065 20612439 10310371 1428557 1683140 12801539 6633053 3134693 2907289 4436974 4681666 1331479 6016447 6811779 9928300 5519952 2988726 6093000 1042520 1907116 2940058 1334795 8944469 2081015 19745289 10146788 757952 11614373 3923561 4093465 12784227 1056426 4961119 865454 6651194 27862596 3051217 624594 8411808 7288000 1831102 5778708 585501
```
 We get the variance of this list by:

```
node ./ variance 4863300 741894 6931071 2988248 39250017 5540545 3576452 952065 20612439 10310371 1428557 1683140 12801539 6633053 3134693 2907289 4436974 4681666 1331479 6016447 6811779 9928300 5519952 2988726 6093000 1042520 1907116 2940058 1334795 8944469 2081015 19745289 10146788 757952 11614373 3923561 4093465 12784227 1056426 4961119 865454 6651194 27862596 3051217 624594 8411808 7288000 1831102 5778708 585501
Variance: 51821053444420.64
```
The variance of a reasonably short list (e.g., the 50 state populations) is most likely a very cumbersome number. So we try to normalize it to something >= 0 and <= 1. Thus:

```
node ./ normalizedVariance 4863300 741894 6931071 2988248 39250017 5540545 3576452 952065 20612439 10310371 1428557 1683140 12801539 6633053 3134693 2907289 4436974 4681666 1331479 6016447 6811779 9928300 5519952 2988726 6093000 1042520 1907116 2940058 1334795 8944469 2081015 19745289 10146788 757952 11614373 3923561 4093465 12784227 1056426 4961119 865454 6651194 27862596 3051217 624594 8411808 7288000 1831102 5778708 585501
Normalized Variance: 0.025429349710810623
```

We've talked about this normalization, and you said that it was valid. I had my doubts about it, based on some notion that, if the list were bounded on one end and unbounded on the other, the normalized variance would somehow be skewed to favor the unbounded end. After all, the raw variance is skewed by magnitude:

```sh
node ./ variance 10 20 && node ./ variance 100 200
Variance: 25
Variance: 2500
```

I (think I) now know that I was wrong about that. I took the fact that no state has a population less than 500,000 (or 0) to have some sort of mathematical significance. It might be a logical bound (can a state with a population less than n be a state?) but mathematically it means nothing. There is no inherent bound to a list of numbers.

I wish I could say that all this came to me in a flash, but it didn't.

```
node ./ normalizedVariance  10 20 && node ./ normalizedVariance 100 200
Normalized Variance: 0.1111111111111111
Normalized Variance: 0.1111111111111111
```
