import test from 'ava'
import chalk from 'chalk'
import ansiAlign from '../'

test('does not blow up on undefined args', (t) => {
  t.is(ansiAlign(), undefined)
})

test('aligns center, splits line feed, and pads with space by default', (t) => {
  // one two three
  //   four five
  let out = ansiAlign('one two three\nfour five')
  t.is(out, 'one two three\n  four five')
})

test('supports ansi', (t) => {
  // first line has four ansi escape sequences
  // second line has two ansi escape sequences
  let inp = chalk.red('one') + ' two ' + chalk.bold('three') + '\n' + chalk.cyan('four ') + 'five'
  let out = ansiAlign(inp)
  t.is(out, chalk.red('one') + ' two ' + chalk.bold('three') + '\n  ' + chalk.cyan('four ') + 'five')
})

test('returns array if given array', (t) => {
  //     one two
  // three four five
  let inp = [chalk.green('one two'), 'three four five']
  let out = ansiAlign(inp)
  t.deepEqual(out, ['    ' + chalk.green('one two'), 'three four five'])
})

test('accepts opts for split, pad, and align', (t) => {
  // ........one two
  // three four five
  let inp = 'one two\tthree four five'
  let out = ansiAlign(inp, { split: '\t', pad: '.', align: 'right' })
  t.is(out, '........one two\tthree four five')
})

test('supports `align: \'left\'` as no-op', (t) => {
  let inp = 'one two three\nfour five'
  let out = ansiAlign(inp, { align: 'left' })
  t.is(out, inp)
})

test('ansiAlign.left is alias for left align (no-op)', (t) => {
  let inp = 'one two three\nfour five'
  let out = ansiAlign.left(inp)
  t.is(out, inp)
})

test('ansiAlign.center is alias for center align', (t) => {
  //    one
  //    two
  // three four
  //    five
  let inp = [' one ', ' two ', ' three four ', ' five ']
  let out = ansiAlign.center(inp)
  t.deepEqual(out, ['    one ', '    two ', ' three four ', '    five '])
})

test('ansiAlign.right is alias for right align', (t) => {
  //       one
  // two three
  //      four
  //      five
  let inp = 'one\ntwo three\nfour\nfive'
  let out = ansiAlign.right(inp)
  t.is(out, '      one\ntwo three\n     four\n     five')
})
