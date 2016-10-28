require 'crxmake'

desc 'make chrome extension'
task 'crx' do
  opts = {
    ex_dir: "./src",
    verbose: true,
    ignorefile: /\.swp/,
    ignoredir: /\.(?:svn|git|cvs)/
  }
  CrxMake.make(opts.merge(crx_output: "dist/pkg.crx"))
  CrxMake.zip(opts.merge(zip_output:  "dist/pkg.zip"))
end

task default: [:crx]
