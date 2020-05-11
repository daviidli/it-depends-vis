# About


[Backend Repo](https://github.com/jyoo980/it-depends)


[Visualization Repo](https://github.com/daviidli/it-depends-vis)


Developers often encounter trouble traversing the information space of a large software system with extensive revision history. Looking through a list of commits is time-consuming, and fails to convey information in a form which efficiently communicates information about the system. it depends is a visualization which makes it easier for developers and managers to understand the dependencies between entities in a software system across commits.


# How to use
The visualization is a matrix denoting the probability of changing one file requiring changes to another file, based on previous commits. In the example below, we can see that if we were to change `InterfaceDecl.ts`, then there is a `55.9%` chance that we would need to change `ClassDecl.spec.ts`. Another way of looking at it is, based on all the commits in the selected range, `55.9%` of the commits that included `InterfaceDecl.ts` also included `ClassDecl.spec.ts`.

The colours of each block represents whether both files are in the same top level directory. When both files are from different directories, the color is black.


![example visualization](example.png)


## Parameters

### Commits

The commits dropdown is located in the header and can be used to specify a range of commits to analyse for the visualization.

### Top count

A slider is located in the header to allow for adjusting how much data the visualization shows. By default, the top 20 files are shown.

### Ordering

A dropdown is located in the header to allow for changing the ordering of the items in the visualization. There are three possible values: `descending`, `ascending` and `directory`.