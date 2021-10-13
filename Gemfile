# Gemfile
source "https://rubygems.org"

gem "fastlane", '2.160.0'

# Attempting to fix ios 15 build issue
gem "xcode-install"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
