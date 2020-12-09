package builds.test

import addTestSettings
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType
import runbld

object JestIntegration : BuildType({
  name = "Jest Integration"
  description = "Executes Jest Integration Tests"

  steps {
    runbld("Jest Integration", "./.ci/teamcity/oss/jest_integration.sh")
  }

  addTestSettings()
})
